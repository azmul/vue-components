<template>
    <div>
        <table id="dynamic-table">
            <tr>
                <th v-for="(column, index) in table.columns" :key="index" @click="sortHandaler(column)">
                    {{column}}
                </th>
            </tr>
            <tr v-for="(data, index) in table.datas" :key="index">
                <td v-for="(column, index) in table.columns" :key="index" v-bind:contenteditable="table.editable">
                    {{data[column]}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import {SET_TABLE_DATAS} from '../../store/mutation-types';

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
                datas:[],
                editable: false,
                sortable: false
            }
        }
    },
    created(){
        let url = this.config.url;
        let headerColumnsNumber = [];
        this.table.editable = this.config.editable;
        this.table.sortable = this.config.sortable;
        
        axios.get(url).then(response=>{
            this.$store.dispatch(SET_TABLE_DATAS, response.data);
            this.table.datas = this.$store.getters.getTableDatas;
             for(let index=0;index<response.data.length;index++){
                 headerColumnsNumber.push(Object.keys(response.data[index]).length);
             }
             this.table.columns = Object.keys(response.data[Math.max(...headerColumnsNumber)]);
        });
    },
    methods:{
        sortHandaler(sortKey){
            if(this.table.sortable){
                this.table.datas.sort((a, b)=> {
                    if (a[sortKey] > b[sortKey]) {
                       return 1;
                    }
                    if (a[sortKey] < b[sortKey]) {
                       return -1;
                    }
                    return 0;
                });
            }else{
                return 0;
            }     
        }
    }
}
</script>

<style scoped>
    #dynamic-table {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #dynamic-table td, #dynamic-table th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #dynamic-table tr:nth-child(even){background-color: #f2f2f2;}

    #dynamic-table tr:hover {background-color: #ddd;}

    #dynamic-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
        text-transform: uppercase;
        cursor: pointer;
    }
</style>


