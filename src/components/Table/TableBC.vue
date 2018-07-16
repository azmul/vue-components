<template>
    <div>
        <table id="dynamic-table">
            <tr>
                <th v-if="table.editableColumnName" 
                    v-bind:class="{'cursor-pointer': column.sortable && table.sortable }" 
                    v-for="(column, index) in table.editableHeaderColumnsNumbers" 
                    :key="index" @click="sortHandaler(column)">
                    <span>{{column.label}}</span>
                </th>
                <th v-if="!table.editableColumnName"
                    v-bind:class="{'cursor-pointer': table.sortable }" 
                    v-for="(column, index) in table.columns" 
                    :key="index" @click="sortHandaler(column)">
                    <span>{{column}}</span>
                </th>
            </tr>
            <tr v-for="(item, index) in table.items" :key="index">
                <td v-if="table.editableColumnName" v-for="(column, index) in table.editableHeaderColumnsNumbers" :key="index" v-bind:contenteditable="table.editable">
                    <span v-if="column.sortable"><span v-if="column.sortable.type ==='date'">{{ (new Date(item[column.key])).toDateString() }}</span></span>
                    <span v-if="column.sortable"><span v-if="column.sortable.type !=='date'">{{item[column.key]}}</span></span>  
                    <span v-else>{{item[column.key]}}</span>            
                </td>
                <td v-if="!table.editableColumnName" v-for="(column, index) in table.columns" :key="index" v-bind:contenteditable="table.editable">
                    <span>{{item[column]}}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        config:{
            type: Object,
            required: true
        }
    },
    data(){
        return{
            table:{
                columns: [],
                editableColumnName: false,
                editableHeaderColumnsNumbers: [],
                editable: false,
                sortable: false,
                fields:{},
                items:[]
            }
        }
    },
    async created(){
        let configObject = {...this.config};

        function tableExecuteFuntion(){
            if(configObject.items.length>0){
            this.table.items = configObject.items;
            this.table.editable = configObject.editable;
            this.table.sortable = configObject.sortable;
            let headerColumnsNumber = [];
            let maxIndex = 0,maxNumber=0;
            
            if(configObject.fields){
                if(Object.keys(configObject.fields).length>0){  // fields configuration true
                    let keys = Object.keys(configObject.fields);
                    for(let index=0;index<keys.length;index++){
                        headerColumnsNumber.push({
                            key:keys[index],
                            label: configObject.fields[keys[index]]['label'],
                            sortable: configObject.fields[keys[index]]['sortable']
                        });
                    }
                    this.table.editableColumnName = true;
                    this.table.editableHeaderColumnsNumbers = headerColumnsNumber;
                }
            }

            for(let index=0;index<configObject.items.length;index++){
                let itemLength = Object.keys(configObject.items[index]).length;
                if(maxNumber < itemLength){
                    maxNumber = itemLength;
                    maxIndex = index;
                }
            }
                this.table.columns = Object.keys(configObject.items[maxIndex]);
            }
        }
        
        if(configObject.url && configObject.url !==''){
           let response = await axios.get(configObject.url);
           configObject.items = response.data;
           tableExecuteFuntion.bind(this)();
        }else{
           tableExecuteFuntion.bind(this)();
        }       
    },
    methods:{
        sortHandaler(columnInfo){
            let sortKey = null;
            if(this.table.sortable){
                if(this.table.editableColumnName){     
                    if(columnInfo.sortable){
                      sortKey = columnInfo.key;
                    }
                }else{
                    sortKey = columnInfo;
                }
                if(columnInfo.sortable.type === 'date'){
                   return this.table.items.sort((a, b)=> {
                        return new Date(a[sortKey]) - new Date(b[sortKey]);
                    });
                }else{
                    this.table.items.sort((a, b)=> {
                        if (a[sortKey] > b[sortKey]) {
                        return 1;
                        }
                        if (a[sortKey] < b[sortKey]) {
                        return -1;
                        }
                        return 0;
                    });
                }
                
            }else{
                return 0;
            }     
        }
    }
}
</script>

<style scoped>
    @import './Table.css';
</style>


