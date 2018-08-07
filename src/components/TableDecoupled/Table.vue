<template>
    <div>
        <div v-if="loadingData" class="loader"></div>
        <div>
            <input type="text" class="search-control" placeholder="Search ..." v-model="search" />
            <table v-if="!loadingData" id="dynamic-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" v-model="selectAll"></th>
                        <th v-if="table.editableColumnName" v-bind:class="{'cursor-pointer': column.sortable && table.sortable }" v-for="(column, index) in table.editableHeaderColumnsNumbers" :key="index" @click="sortHandaler(column)">
                            <span>{{column.label}}</span>
                        </th>
                        <th v-if="!table.editableColumnName" v-bind:class="{'cursor-pointer': table.sortable }" v-for="(column, index) in table.columns" :key="index" @click="sortHandaler(column)">
                            <span>{{column}}</span>
                        </th>
                    </tr>
                </thead>
                <tbody v-bind:style="{ height: table.heightValue + 'px' }">
                    <tr v-for="(item, index) in table.items" :key="index">
                        <td>
                            <input type="checkbox" class="cursor-pointer" v-model="selected" :value="item.id" number>
                        </td>
                        <td v-if="table.editableColumnName" v-for="(column, index) in table.editableHeaderColumnsNumbers" :key="index" v-bind:contenteditable="table.editable">
                            <span v-if="column.sortable"><span v-if="column.sortable.type ==='date'">{{ (new Date(item[column.key])).toDateString() }}</span></span>
                            <span v-if="column.sortable"><span v-if="column.sortable.type !=='date'">{{item[column.key]}}</span></span>
                            <span v-else>{{item[column.key]}}</span>
                        </td>
                        <td v-if="!table.editableColumnName" v-for="(column, index) in table.columns" :key="index" v-bind:contenteditable="table.editable">
                            <span>{{item[column]}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { serverBus } from '../../main';

export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPage: this.config.paginationConfig.currentPage || 1,
      limit: this.config.paginationConfig.perPages || 10,
      loadingData: false,
      selected: [],
      itemsData: [],
      customLimit: [],
      search: '',
      table: {
        columns: [],
        editableColumnName: false,
        editableHeaderColumnsNumbers: [],
        editable: false,
        sortable: false,
        fields: {},
        items: [],
        heightValue: '',
      },
      sortKey: this.config.sortKey,
      sortOrder: ['asc'],
    };
  },
  created() {
    if (this.config.url && this.config.url !== '') {
      this.serverCallForData(this.config);
    } else {
      this.tableExecuteHadaler(this.config);
    }

    if (this.config.heigth && this.config.heigth !== '') {
      this.table.heightValue = this.config.heigth;
    }
  },
  mounted() {
    serverBus.$on('serverSelected', data => {
      console.log(this.config);
      this.serverCallForData(this.config,data);
    });
  },
  computed: {
    selectAll: {
      get: function() {
        return this.table.items
          ? this.selected.length == this.table.items.length
          : false;
      },
      set: function(value) {
        var selected = [];

        if (value) {
          this.table.items.forEach(function(item) {
            selected.push(item.id);
          });
        }
        this.selected = selected;
      },
    },
  },
  methods: {
    itemsSorted() {
      this.table.items = this.$lodash.orderBy(
        this.table.items,
        this.sortKey,
        this.sortOrder,
      );
    },
    sortHandaler(columnInfo) {
      let key = null;
      if (this.table.sortable) {
        if (this.table.editableColumnName) {
          if (columnInfo.sortable) {
            key = columnInfo.key;
          }
        } else {
          key = columnInfo;
        }
        if (columnInfo.sortable.type === 'date') {
          return this.table.items.sort((a, b) => {
            return new Date(a[key]) - new Date(b[key]);
          });
        } else {
          if (key == this.sortKey) {
            this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
          } else {
            this.sortKey = key;
            this.sortOrder = 'asc';
          }
          this.itemsSorted();
        }
      } else {
        return 0;
      }
    },
    async serverCallForData(configObject, data) {
      this.loadingData = true;
      let page, limit, baseUrl, url;
      if (data) {
        page = data.page;
        limit = data.limit;
      } else {
        page = 1;
        limit = 10;
      }

      baseUrl = configObject.url;
      if (limit === 'all') {
        url = baseUrl;
      } else {
        url = `${baseUrl}?_page=${page}&_limit=${limit}`;
      }
      let response = await axios.get(url);
      this.loadingData = false;
      configObject.items = response.data;
      this.itemsData = response.data;
      this.tableExecuteHadaler(configObject);
    },
    tableExecuteHadaler(configObject) {
      if (configObject.items.length > 0) {
        this.table.items = [...configObject.items];
        this.itemsSorted();
        this.table.editable = configObject.editable;
        this.table.sortable = configObject.sortable;
        let headerColumnsNumber = [];
        let maxIndex = 0,
          maxNumber = 0;

        if (configObject.fields) {
          if (Object.keys(configObject.fields).length > 0) {
            // fields configuration true
            let keys = Object.keys(configObject.fields);
            for (let index = 0; index < keys.length; index++) {
              headerColumnsNumber.push({
                key: keys[index],
                label: configObject.fields[keys[index]]['label'],
                sortable: configObject.fields[keys[index]]['sortable'],
              });
            }
            this.table.editableColumnName = true;
            this.table.editableHeaderColumnsNumbers = headerColumnsNumber;
          }
        }

        for (let index = 0; index < configObject.items.length; index++) {
          let itemLength = Object.keys(configObject.items[index]).length;
          if (maxNumber < itemLength) {
            maxNumber = itemLength;
            maxIndex = index;
          }
        }
        this.table.columns = Object.keys(configObject.items[maxIndex]);
      }
    },
  },
  watch: {
    selected(val) {
      this.$emit('input', val);
    },
    search: function() {
      let searchItemsFilter = [...this.itemsData];
      if (this.search) {
        searchItemsFilter.forEach((item, itemIndex) => {
          let keys = Object.keys(item);
          for (let index = 0; index < keys.length; index++) {
            let type = typeof item[keys[index]];
            if (type === 'number') {
              searchItemsFilter[itemIndex][keys[index]] = searchItemsFilter[
                itemIndex
              ][keys[index]].toString();
            }
          }
        });
        
        this.table.items = searchItemsFilter.filter(
          (item,index) =>
            item[this.table.editableHeaderColumnsNumbers[index].key].toUpperCase().includes(this.search.toUpperCase()) 
        );
      } else {
        this.table.items = searchItemsFilter;
      }
    },
  },
};
</script>

<style scoped>
@import './Table.css';
</style>


