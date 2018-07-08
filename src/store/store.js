import  Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state:{
       tableDatas: []
    },
    getters:{
        getTableDatas: state => {
            return state.tableDatas;
        }
    },
    mutations:{
        setTableDatas(state,payload){
           state.tableDatas = payload;
        }
    },
    actions:{
        setTableDatas(context,payload) {
            context.commit('setTableDatas',payload);
        }
    }
}) 