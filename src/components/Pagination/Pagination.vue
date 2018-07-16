<template>
    <div>
        <div class="pagination">
            <a href="#" @click="getFirstPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstArrow}]" >&laquo;</a>
            <a href="#" @click="getPreviousPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstLastArrow}]">&lsaquo;</a>
                <a href="#" 
                   v-for="(row,index) in pagination.numberOfRows" :key="index"
                   @click="selectedRow(row,index)"
                   v-bind:class="[{ active: index === (pagination.page-1)},pagination.size]"
                   >
                    {{row}}
                </a>
            <a href="#" @click="getLatterPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastFirstArrow}]">&rsaquo;</a>
            <a href="#" @click="getLastPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastArrow}]">&raquo;</a>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        config:{
            type: Object,
            required: true
        }
    },
    data(){
        return{
                pagination:{
                    numberOfRows: Math.ceil(this.config.totalRows/this.config.perPages),
                    page: this.config.currentPage || 1,
                    limit: Math.ceil(this.config.totalRows/this.config.perPages),
                    size: this.config.size,
                    disableField:{
                        firstArrow: true,
                        firstLastArrow: true,
                        lastArrow: false,
                        lastFirstArrow: false,
                    }
                }
                
            }
    },
    created(){

    },
    methods:{
        disableArrowHandaler(firstArrow,firstLastArrow,lastFirstArrow,lastArrow){
            this.pagination.disableField.firstArrow = firstArrow;
            this.pagination.disableField.firstLastArrow = firstLastArrow;
            this.pagination.disableField.lastFirstArrow = lastFirstArrow;
            this.pagination.disableField.lastArrow = lastArrow;
        },
        selectedRow(row,index){
            this.pagination.isActive = index;
            this.pagination.page = row;
            if(row === 1){
                this.disableArrowHandaler(true,true,false,false);
            }else if(row === this.pagination.numberOfRows){
                this.disableArrowHandaler(false,false,true,true);
            }else{
                this.disableArrowHandaler(false,false,false,false);
            }
        },
        getFirstPage(){
            this.pagination.page = 1;
            this.disableArrowHandaler(true,true,false,false);
        },
        getPreviousPage(){
            if(this.pagination.page > 1){
              this.pagination.page = this.pagination.page - 1;
              if(this.pagination.page === 1){
                this.disableArrowHandaler(true,true,false,false);
               }
            }     
        },
        getLatterPage(){
            if(this.pagination.page < this.pagination.numberOfRows){
              this.pagination.page = this.pagination.page + 1;
              if(this.pagination.page === this.pagination.numberOfRows){
                this.disableArrowHandaler(false,false,true,true);
              }
            }
        },
        getLastPage(){
            this.pagination.page = this.pagination.numberOfRows;
            this.disableArrowHandaler(false,false,true,true);
        }
    }
}
</script>
<style scoped>
  @import './Pagination.css';
</style>
