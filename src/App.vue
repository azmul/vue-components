<template>
  <div id="app">
    <!-- <select-component v-model="selected" v-bind:config="selectConfig">
      <optgroup v-if="selectConfig.groupOptions" v-bind:label="selectConfig.groupOptions.label">
        <option 
            v-for="(option,index) in selectConfig.groupOptions.options" 
            :disabled="option.disabled"
            :key="index" 
            :value="option.value">
            {{option.text}}
        </option>
      </optgroup>
    </select-component> -->
    <!-- <MultiSelect v-model="selected" v-bind:config="selectSearchConfig"></MultiSelect> -->
    <!-- <Search v-model="selected" v-bind:config="selectConfig"></Search> -->
    <!-- <CumtomTable v-model="selected" v-bind:config="tableConfig" /> -->
    <!-- <FilterComponent  v-bind:config="filterConfig" /> -->
    <!-- <Test></Test> -->
    <!-- <Table /> -->
    <!-- <datepicker v-model="date"></datepicker> -->
    <!-- <PathaoMultiSelect v-bind:config="selectSearchConfig"></PathaoMultiSelect> -->
    <!-- <tabs>
      <tab name="Pay" :selected="true">
        <p>
          Lorem ipsum dolor sit amet, pri ne dico audiam, vis dicant offendit senserit cu. An nam saepe ponderum, no quo omnis aperiam oporteat. Dolorem mandamus ius ei, te usu reque aperiri, ex ubique quidam sit. Ei pri vidisse indoctum, vix soleat impetus ei,
          qui virtute forensibus ei. An posse noluisse nec, ei consul mediocrem persecuti duo, no numquam epicurei phaedrum eum. Ea sea possim facilisi. Vis an alii unum augue. Sed ei soleat eirmod commodo. Ad per posidonium consequuntur, partem consulatu
          pro id. Ceteros ocurreret te mel. At dicant nominavi pro, ei inani populo assentior nec.
        </p>
      </tab>
      <tab name="Delivers">
        <p>
          Vis an alii unum augue. Sed ei soleat eirmod commodo. Ad per posidonium consequuntur, partem consulatu pro id. Ceteros ocurreret te mel. At dicant nominavi pro, ei inani populo assentior nec.
        </p>
      </tab>
      <tab name="Parcels">
        <p>
          Lorem ipsum dolor sit amet, pri ne dico audiam, vis dicant offendit senserit cu. An nam saepe ponderum, no quo omnis aperiam oporteat. Dolorem mandamus ius ei, te usu reque aperiri, ex ubique quidam sit. Ei pri vidisse indoctum, vix soleat impetus ei,
          qui virtute forensibus ei. An posse noluisse nec, ei consul mediocrem persecuti duo, no numquam epicurei phaedrum eum. Ea sea possim facilisi.
        </p>
      </tab>
      <tab name="Rides">
        <p>
         posse noluisse nec, ei consul mediocrem persecuti duo, no numquam epicurei phaedrum eum. Ea sea possim facilisi.
        </p>
      </tab>
    </tabs> -->
    <!-- <Pagination  v-bind:config="tableConfig" /> -->

    <TableDecoupled v-model="selected" :config="tableConfig" />
    <!-- <PaginationDecouple :config="paginationConfig"  /> -->

  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Tabs from './components/Tabs/';
import Tab from './components/Tabs/Tab';
import FilterComponent from './components/Filter/Filters';
import Test from './components/Test/Test';
import DatePicker from './components/DatePicker/DatePicker';

import SelectComponent from './components/Select/Select';
import MultiSelect from './components/MultiSelect/Multiselect';
import Search from './components/Search/Search';
import Table from './components/Table/Table';
import CumtomTable from './components/TableWithPagination/TableWithPagination';
import Pagination from './components/Pagination/Pagination';
import PaginationDecouple from './components/PaginationDecouple/Pagination';
import TableDecoupled from './components/TableDecoupled/Table';

export default {
  name: 'app',
  components: {
    Tabs,
    Tab,
    Table,
    FilterComponent,
    Test,
    Datepicker,
    MultiSelect,
    SelectComponent,
    Search,
    CumtomTable,
    Pagination,
    PaginationDecouple,
    TableDecoupled,
  },
  data() {
    return {
      date: new Date(2016, 9, 16),
      disabled: {
        to: new Date(2016, 0, 5), // Disable all dates up to specific date
        from: new Date(2016, 0, 26), // Disable all dates after specific date
        days: [6, 0], // Disable Saturday's and Sunday's
        dates: [
          // Disable an array of dates
          new Date(2016, 9, 16),
          new Date(2016, 9, 17),
          new Date(2016, 9, 18),
        ],
      },
      tableConfig: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        editable: true,
        sortable: true,
        heigth: '500',
        sortKey: 'id',
        customLimit: [5, 10, 15, 20, 25, 'all'],
        funcName: 'serverSelected',
        fields: {
          id: {
            label: 'ID',
            sortable: {
              type: 'number',
            },
          },
          body: {
            label: 'Body',
            sortable: {
              type: 'string',
            },
          },
          title: {
            label: 'Title',
            sortable: {
              type: 'string',
            },
          },
        },
        items: [
          {
            isActive: true,
            age: 40,
            first_name: 'Dickerson',
            last_name: 'Macdonald',
            date: '2011-04-11T10:20:30Z',
          },
          {
            isActive: false,
            age: 21,
            first_name: 'Larsen',
            last_name: 'Shaw',
            date: '2011-04-08T10:20:30Z',
          },
          {
            isActive: false,
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            date: '2010-04-11T10:20:30Z',
            testFiled: true,
          },
          {
            isActive: true,
            age: 38,
            first_name: 'Jami',
            last_name: 'Carney',
            date: '2011-04-15T10:20:30Z',
          },
        ],
        paginationConfig: {
          totalRows: 1000,
          currentPage: 1,
          limit: 10,
          size: 'medium',
          customLimit: [5, 10, 15, 20, 25, 'all'],
          funcName: 'serverSelected',
        },
      },
      paginationConfig: {
        totalRows: 1000,
        currentPage: 1,
        limit: 10,
        size: 'medium',
        customLimit: [5, 10, 15, 20, 25, 'all'],
        funcName: 'serverSelected',
      },
      selected: null,
      selectConfig: {
        multiSelect: false,
        options: [
          {
            value: null,
            text: 'Please select an option',
          },
          {
            value: 'a',
            text: 'This is First option',
          },
          {
            value: 'b',
            text: 'Selected Option',
          },
          {
            value: {
              C: '3PO',
            },
            text: 'This is an option with object value',
          },
          {
            value: 'd',
            text: 'This one is disabled',
            disabled: true,
          },
        ],
        groupOptions: {
          label: 'Group Options',
          options: [
            {
              text: 'Item 1',
              value: 'first',
            },
            {
              text: 'Item 2',
              value: 'second',
            },
            {
              text: 'Item 3',
              value: 'third',
              disabled: true,
            },
            {
              text: 'Item 3',
              value: {
                foo: 'bar',
                baz: true,
              },
            },
          ],
        },
      },
      selectSearchConfig: {
        options: [
          {
            value: 'bangladesh',
            text: 'Bangladesh Country',
          },
          {
            value: 'Albania',
            text: 'Albania Country',
          },
          {
            value: 'Austria',
            text: 'Austria Country',
          },
          {
            value: {
              C: 'Bahamas',
            },
            text: 'Bahamas Country',
          },
          {
            value: 'Belgium',
            text: 'Belgium Country',
            disabled: true,
          },
          {
            value: 'Herzegovina',
            text: 'Herzegovina Country',
          },
          {
            value: 'China',
            text: 'China Country',
          },
          {
            value: {
              G: 'Croatia',
            },
            text: 'Croatia Country',
          },
          {
            value: 'Eritrea',
            text: 'Eritrea Country',
            disabled: true,
          },
        ],
      },
      filterConfig: [
        {
          name: 'Budget',
          type: 'range',
          palceholder: '$',
        },
        {
          name: 'Name',
          type: 'text',
        },
        {
          name: 'Experience Label',
          type: 'checkbox',
          value: ['0-1', '1-2', '2-3', '3-10'],
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
