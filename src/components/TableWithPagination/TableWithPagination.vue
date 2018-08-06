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
            <ul>
                <li>
                    <div class="pagination">
                        <a href="#" @click="getFirstPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstArrow}]">&laquo;</a>
                        <a href="#" @click="getPreviousPage('left')" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstArrow}]">&lsaquo;</a>
    
                        <a v-if="pagination.page.page1" href="#" @click="selectPage(1,pagination.pageNumber.first)" v-bind:class="[pagination.size, { active: pagination.isActivePage === 1},{'disabled': pagination.spreed.firstDot}]">
                            <span v-if="!pagination.spreed.firstDot">{{pagination.pageNumber.first}}</span>
                            <span v-if="pagination.spreed.firstDot">...</span>
                        </a>
                        <a v-if="pagination.page.page2" href="#" @click="selectPage(2,pagination.pageNumber.second,'left')" v-bind:class="[pagination.size, { active: pagination.isActivePage === 2}]">
                                                                                    {{pagination.pageNumber.second}}
                                                                                </a>
                        <a v-if="pagination.page.page3" href="#" @click="selectPage(3,pagination.pageNumber.third,'middle')" v-bind:class="[pagination.size,{ active: pagination.isActivePage === 3}]">
                                                                                    {{pagination.pageNumber.third}}
                                                                                </a>
                        <a v-if="pagination.page.page4" href="#" @click="selectPage(4,pagination.pageNumber.four,'right')" v-bind:class="[pagination.size,{ active: pagination.isActivePage === 4}]">
                                                                                    {{pagination.pageNumber.four}}
                                                                                </a>
                        <a v-if="pagination.page.page5" href="#" @click="selectPage(5,pagination.pageNumber.five)" v-bind:class="[pagination.size,{ active: pagination.isActivePage === 5},{'disabled': pagination.spreed.lastDot}]">
                            <span v-if="!pagination.spreed.lastDot">{{pagination.pageNumber.five}}</span>
                            <span v-if="pagination.spreed.lastDot">...</span>
                        </a>
    
                        <a href="#" @click="getLatterPage('right')" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastArrow}]">&rsaquo;</a>
                        <a href="#" @click="getLastPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastArrow}]">&raquo;</a>
                    </div>
                </li>
                <li class="rows-per-page">
                    <span>Rows per page:
                            <select v-model="limit" >
                                <option v-for="(value,index) in customLimit" :key="index" :value="value">
                                  {{value.toString().toUpperCase()}}
                                </option>
                            </select>
                        </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

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
      customLimit:[],
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
      pagination: {
        numberOfPages:
          Math.ceil(
            this.config.paginationConfig.totalRows /
              this.config.paginationConfig.perPages,
          ) || 1,
        isActivePage: 1,
        size: this.config.paginationConfig.size,
        side: null,
        sideClick: false,
        page: {
          page1: false,
          page2: false,
          page3: false,
          page4: false,
          page5: false,
        },
        disableField: {
          firstArrow: true,
          lastArrow: false,
        },
        pageNumber: {
          first: 1,
          second: 2,
          third: 3,
          four: 4,
          five: 5,
        },
        spreed: {
          firstDot: false,
          lastDot: true,
        },
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
    if(this.config.customLimit){
      if(this.config.customLimit.length>0){
        this.customLimit = [...this.config.customLimit];
        if(this.config.customLimit.indexOf('all') < 0){
          this.customLimit.push('all');
        }
      }else{
        this.customLimit.push('all');
      }
    }
    // Pagination
    for (let index = 1; index <= this.pagination.numberOfPages; index++) {
      switch (index) {
        case 1:
          this.pagination.page.page1 = true;
          break;
        case 2:
          this.pagination.page.page2 = true;
          break;
        case 3:
          this.pagination.page.page3 = true;
          break;
        case 4:
          this.pagination.page.page4 = true;
          break;
        case 5:
          this.pagination.page.page5 = true;
          break;
        default:
          break;
      }
    }
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
    async serverCallForData(configObject, all) {
      this.loadingData = true;
      let page, limit, baseUrl, url;
      page = this.currentPage;
      limit = this.limit;
      baseUrl = configObject.url;
      if (all === 'all') {
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
    disableArrowHandaler(firstArrow, lastArrow) {
      this.pagination.disableField.firstArrow = firstArrow;
      this.pagination.disableField.lastArrow = lastArrow;
    },
    changePageNumber(first, second, third, four, five) {
      this.pagination.pageNumber.first += first;
      this.pagination.pageNumber.second += second;
      this.pagination.pageNumber.third += third;
      this.pagination.pageNumber.four += four;
      this.pagination.pageNumber.five += five;
    },
    changePage(first, second, third, four, five) {
      this.pagination.pageNumber.first = first;
      this.pagination.pageNumber.second = second;
      this.pagination.pageNumber.third = third;
      this.pagination.pageNumber.four = four;
      this.pagination.pageNumber.five = five;
    },
    selectPage(index, pageNumber, side) {
      this.currentPage = pageNumber;
      this.pagination.side = side;
    },
    dotHandaler(first, last) {
      this.pagination.spreed.firstDot = first;
      this.pagination.spreed.lastDot = last;
    },
    getFirstPage() {
      this.changePage(1, 2, 3, 4, 5);
      this.pagination.isActivePage = 1;
      this.currentPage = 1;
      this.disableArrowHandaler(true, false);
      this.dotHandaler(false, true);
    },
    getLastPage() {
      let pages = this.pagination.numberOfPages;
      if (pages > 5) {
        this.changePage(pages - 4, pages - 3, pages - 2, pages - 1, pages);
        this.pagination.isActivePage = 5;
        this.currentPage = pages;
        this.disableArrowHandaler(false, true);
        this.dotHandaler(true, false);
      } else {
        this.pagination.isActivePage = pages;
        this.currentPage = pages;
        this.disableArrowHandaler(false, true);
        this.dotHandaler(false, false);
      }
    },
    getPreviousPage(side) {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.pagination.side = side;
      } else {
        return false;
      }
    },
    getLatterPage(side) {
      if (this.currentPage < this.pagination.numberOfPages) {
        this.currentPage += 1;
        this.pagination.side = side;
      } else {
        return false;
      }
    },
  },
  watch: {
    currentPage: function(page) {
      let pages = this.pagination.numberOfPages,
        side = this.pagination.side;

      this.serverCallForData(this.config); // call to server

      switch (page) {
        case pages: {
          this.disableArrowHandaler(false, true);
          break;
        }
        case 1: {
          this.disableArrowHandaler(true, false);
          break;
        }
        default: {
          this.disableArrowHandaler(false, false);
          break;
        }
      }
      if (this.pagination.numberOfPages > 5) {
        if (page < 4) {
          this.changePage(1, 2, 3, 4, 0);
          this.dotHandaler(false, true);
          this.pagination.isActivePage = page;
        } else if (page > pages - 3) {
          this.changePage(0, pages - 3, pages - 2, pages - 1, pages);
          this.dotHandaler(true, false);
          let activePage = (this.pagination.isActivePage = page % 5);
          if (activePage === 0) {
            this.pagination.isActivePage = 5;
          } else {
            this.pagination.isActivePage = activePage;
          }
        } else {
          this.dotHandaler(true, true);
          this.pagination.isActivePage = 3;
          switch (side) {
            case 'left': {
              this.changePageNumber(-1, -1, -1, -1, -1);
              break;
            }
            case 'right': {
              this.changePageNumber(1, 1, 1, 1, 1);
              break;
            }
            default: {
              break;
            }
          }
        }
      } else {
        this.pagination.isActivePage = page;
      }
    },
    limit: function(limit) {
      if (limit === 'all') {
        this.serverCallForData(this.config, limit);
      } else {
        this.serverCallForData(this.config);
      }
    },
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
          item =>
            item.id.toUpperCase().includes(this.search.toUpperCase()) ||
            item.userId.toUpperCase().includes(this.search.toUpperCase()) ||
            item.title.toUpperCase().includes(this.search.toUpperCase()) ||
            item.body.toUpperCase().includes(this.search.toUpperCase()),
        );
      } else {
        this.table.items = searchItemsFilter;
      }
    },
  },
};
</script>

<style scoped>
@import './TableWithPagination.css';
</style>


