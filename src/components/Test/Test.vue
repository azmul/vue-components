<template>
      <div class="pagination">
        <a  v-for="(page,index) in 9" :key="index" @click="index === 0 ? getFirstPage() : index === 1 ? getPreviousPage('left'): index === 7 ? getLatterPage('right'): index === 8 ? getLastPage():
            selectPage(1,pagination.pageNumber[index+1], index===4 ?'middle': (index===3?'left':(index===5?'right': null)))"
            :class="[pagination.size, { active: pagination.isActivePage === index+1},
            {'disabled': index===2 ? pagination.spreed.firstDot :
                         index===6? pagination.spreed.lastDot : 
                         index === 0 || index === 1  ? pagination.disableField.firstArrow :
                         index === 7 || index === 8  ? pagination.disableField.lastArrow :
                         null}]"
             v-if="pagination.page[index+1]" >
             <span v-if="index === 0">&laquo;</span>
             <span v-else-if="index === 1">&lsaquo;</span>
             <span v-else-if="index === 2">
                   <span v-if="!pagination.spreed.firstDot">{{pagination.pageNumber[index-1]}}</span>
                   <span v-if="pagination.spreed.firstDot">...</span>
            </span>
            <span v-else-if="index === 6">
                    <span v-if="!pagination.spreed.lastDot">{{pagination.pageNumber[index-1]}}</span>
                    <span v-if="pagination.spreed.lastDot">...</span>
            </span>
            <span v-else-if="index === 7">&rsaquo;</span>
            <span v-else-if="index === 8">&raquo;</span>
            <span v-else>{{pagination.pageNumber[index-1]}}</span>
        </a>
      </div>          
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        size: 'medium',
        isActivePage: 2,
        page: {
          '1': true,
          '2': true,
          '3': true,
          '4': true,
          '5': true,
          '6': true,
          '7': true,
          '8': true,
          '9': true,
        },
        disableField: {
          firstArrow: true,
          lastArrow: false,
        },
        pageNumber: {
          '1': 1,
          '2': 2,
          '3': 3,
          '4': 4,
          '5': 5,
        },
        spreed: {
          firstDot: false,
          lastDot: true,
        },
      },
    };
  },
  methods: {
    selectPage(index, page, side) {
      console.log(index, page, side);
    },
    getFirstPage() {
      console.log('click');
    },
  },
};
</script>

<style>
</style>
