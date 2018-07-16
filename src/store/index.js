import  Vue from 'vue';
import Vuex from 'vuex';
import {SET_TABLE_DATAS} from './mutation-types';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state:{
       tableDatas: []
    },
    getters:{
        getTableDatas: state => {
            return state.tableDatas;
        },
        getTableDataById: (state) => (id) =>{
            return state.tableDatas[id];
        }
    },
    mutations:{
        [SET_TABLE_DATAS](state,payload){
           state.tableDatas = payload;
        }
    },
    actions:{
        SET_TABLE_DATAS(context,payload){
            context.commit(SET_TABLE_DATAS,payload);
         }
    }
}) 