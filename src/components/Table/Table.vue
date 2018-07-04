<template>
    <div>
        <table id="dynamic-table">
            <tr>
                <th v-for="(column, index) in table.columns" :key="index">
                    {{column}}
                </th>
            </tr>
            <tr v-for="(data, index) in table.datas" :key="index">
                <td v-for="(column, index) in table.columns" :key="index">
                    {{data[column]}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        url:{
            type: String,
            required: true
        }
    },
    data(){
        return{
            table:{
                columns: [],
                datas:[]
            }
        }
    },
    created(){
        let url = this.url;
        axios.get(url).then(response=>{
             this.table.datas = response.data;
             this.table.columns = Object.keys(response.data[0]);
        });
    }
}
</script>

<style scoped>
    #dynamic-table {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
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
    }
</style>


