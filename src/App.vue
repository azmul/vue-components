<template>
  <div id="app">
    <Table v-bind:config="tableConfig" />
    <!-- <Pagination  v-bind:config="tableConfig" /> -->
  </div>
</template>

<script>
 //import Table from './components/Table/Table.vue';
import Table from './components/TableWithPagination/TableWithPagination.vue';
//import Pagination from './components/Pagination/PaginationTwo.vue';
//import Pagination from './components/Pagination/PaginationTwo.vue';
export default {
  name: 'app',
  components: {
    Table,
    //Pagination
  },
  data(){
    return{
      tableConfig:{
           url: 'https://jsonplaceholder.typicode.com/posts',
           editable: true,
           sortable: false,
           fields:{
                // isActive: {
                //   label: 'Is Active'
                // },
                // age: {
                //   label: 'Age',
                //   sortable: {
                //     type: 'number'
                //   }
                // },
                // last_name: {
                //   label: 'Last name',
                //   sortable: {
                //     type: 'string'
                //   }
                // },
                // date: {
                //   label: 'Birth Date',
                //   sortable: {
                //     type: 'date'
                //   }
                // },
                // first_name: {
                //   label: 'First name'
                // }
                id: {
                  label: 'ID',
                  sortable: {
                    type: 'number'
                  }
                },
                body: {
                  label: 'Body',
                  sortable: {
                    type: 'string'
                  }
                },
                title: {
                  label: 'Title',
                  sortable: {
                    type: 'string'
                  }
                }
           },
           items:[
              { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald',date: '2011-04-11T10:20:30Z' },
              { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw',date: '2011-04-08T10:20:30Z' },
              { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson',date: '2010-04-11T10:20:30Z',testFiled: true },
              { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney',date: '2011-04-15T10:20:30Z' }
           ],
           paginationConfig:{
            totalRows: 100,
            currentPage: 2,
            perPages: 10,
            size: 'medium'
          }
      },
      paginationConfig:{
        totalRows: 1000,
        perPages: 10,
        size: 'medium'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
