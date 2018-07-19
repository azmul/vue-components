## Select component

For displaying tabular data. Table component  supports pagination, filtering, sorting, custom rendering, events, and asynchronous data.

Using Table Component should provide a config object as props from parent component. Config object wants some configuration such as url, items, sortable, editable, fields configuration, pagination config etc. 

Example: 

```
<Table v-bind:config="tableConfig" />
tableConfig:{
          url: 'https://jsonplaceholder.typicode.com/users',
          editable: true,
          sortable: true,
          fields:{
               isActive: {
                 label: 'Is Active'
               },
               age: {
                 label: 'Age',
                 sortable: {
                   type: 'number'
                 }
               },
               last_name: {
                 label: 'Person Last name',
                 sortable: {
                   type: 'string'
                 }
               },
               first_name: {
                 label: 'Person First name'
               },
               date: {
                 label: 'Birth Date',
                 sortable: {
                   type: 'date'
                 }
               },
          },
          items:[
             { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald',date: '2011-04-11T10:20:30Z' },
             { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw',date: '2011-04-08T10:20:30Z' },
             { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson',date: '2010-04-11T10:20:30Z',testFiled: true },
             { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney',date: '2011-04-15T10:20:30Z' }
          ]
     },
     paginationConfig:{
       totalRows: 100,
       perPages: 10,
       currentPage: 2,
       size: 'medium'
     }
   }

```

#### url ( source of table data )
Url is the source of table data in array format. If we do not want to provide an url then must provide items ( array data). It’s default value is empty string.


#### editable
Editable field take boolean value. It’s default value is false.  If we give true as value then each individual cell will be editable of table. Otherwise each individual cell would be not editable.

#### sortable
Sortable field take boolean value. It’s default value is false.  If we give true as value then each column will be sortable of table. Otherwise each column would be not sortable.

#### fields
Fields can be an object. The fields prop is used to customize the table columns headings, and in which order the columns of data are displayed. The field object keys are used to extract the value from each item (record) row, and to provide additional features such as enabling sorting on the column, etc.

Example:

```
date: {
        label: 'Birth Date',
        sortable: {
           type: 'date'
        }
    }

```
Here label indicates columns heading name, want to sort then keep sortable with type.

#### paginationConfig
If we want a pagination for our table’s data. Configure paginationConfig object


Example:

```
paginationConfig:{
       totalRows: 100,
       perPages: 10,
       currentPage: 2,
       size: 'medium'
  }

```
We can set size of pagination through size type , default value is medium but we can provide large and small. 
We can set current page with currentPage type. Default value is 1.
totalRows is the number of arrays data which are provide from url or items. Default value is 100.
perPages indicates number of items which items will be show in per page. 


