<template>
  <ul>
      <li>
          <div class="pagination">
              <a href="#" @click="getFirstPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstArrow}]">&laquo;</a>
              <a href="#" @click="getPreviousPage('left')" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstArrow}]">&lsaquo;</a>

              <a v-if="pagination.page.page1" href="#" @click="selectPage(1,pagination.pageNumber.first)" v-bind:class="[pagination.size, { active: pagination.isActivePage === 1},{'disabled': pagination.spreed.firstDot}]">
                  <span v-if="!pagination.spreed.firstDot">{{pagination.pageNumber.first}}</span>
                  <span v-if="pagination.spreed.firstDot">...</span>
              </a>
              <a v-if="pagination.page.page2" href="#" @click="selectPage(2,pagination.pageNumber.second,'left')" v-bind:class="[pagination.size, { active: pagination.isActivePage === 2}]">
                                                                          {{pagination.pageNumber.second}}
                                                                      </a>
              <a v-if="pagination.page.page3" href="#" @click="selectPage(3,pagination.pageNumber.third,'middle')" v-bind:class="[pagination.size,{ active: pagination.isActivePage === 3}]">
                                                                          {{pagination.pageNumber.third}}
                                                                      </a>
              <a v-if="pagination.page.page4" href="#" @click="selectPage(4,pagination.pageNumber.four,'right')" v-bind:class="[pagination.size,{ active: pagination.isActivePage === 4}]">
                                                                          {{pagination.pageNumber.four}}
                                                                      </a>
              <a v-if="pagination.page.page5" href="#" @click="selectPage(5,pagination.pageNumber.five)" v-bind:class="[pagination.size,{ active: pagination.isActivePage === 5},{'disabled': pagination.spreed.lastDot}]">
                  <span v-if="!pagination.spreed.lastDot">{{pagination.pageNumber.five}}</span>
                  <span v-if="pagination.spreed.lastDot">...</span>
              </a>

              <a href="#" @click="getLatterPage('right')" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastArrow}]">&rsaquo;</a>
              <a href="#" @click="getLastPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastArrow}]">&raquo;</a>
          </div>
      </li>
      <li class="rows-per-page">
          <span>Rows per page:
            <select v-model="limit" >
                <option v-for="(value,index) in customLimit" :key="index" :value="value">
                  {{value.toString().toUpperCase()}}
                </option>
            </select>
          </span>
      </li>
    </ul>
</template>

<script>
import { EventBus } from '../../main';

export default {
  props:{
    config:{
      type:Object,
      required: true
    }
  },
  data() {
    return {
      customLimit: this.config.customLimit,
      currentPage: this.config.currentPage || 1,
      limit: this.config.limit || 10,
      pagination: {
        numberOfPages: 12,
        isActivePage: this.config.currentPage || 1,
        size: this.config.size,
        side: null,
        sideClick: false,
        page: {
          page1: false,
          page2: false,
          page3: false,
          page4: false,
          page5: false,
        },
        disableField: {
          firstArrow: true,
          lastArrow: false,
        },
        pageNumber: {
          first: 1,
          second: 2,
          third: 3,
          four: 4,
          five: 5,
        },
        spreed: {
          firstDot: false,
          lastDot: true,
        },
      },
    };
  },
  created() {
    // Pagination
    for (let index = 1; index <= this.pagination.numberOfPages; index++) {
      switch (index) {
        case 1:
          this.pagination.page.page1 = true;
          break;
        case 2:
          this.pagination.page.page2 = true;
          break;
        case 3:
          this.pagination.page.page3 = true;
          break;
        case 4:
          this.pagination.page.page4 = true;
          break;
        case 5:
          this.pagination.page.page5 = true;
          break;
        default:
          break;
      }
    }
  },
  methods: {
    disableArrowHandaler(firstArrow, lastArrow) {
      this.pagination.disableField.firstArrow = firstArrow;
      this.pagination.disableField.lastArrow = lastArrow;
    },
    changePageNumber(first, second, third, four, five) {
      this.pagination.pageNumber.first += first;
      this.pagination.pageNumber.second += second;
      this.pagination.pageNumber.third += third;
      this.pagination.pageNumber.four += four;
      this.pagination.pageNumber.five += five;
    },
    changePage(first, second, third, four, five) {
      this.pagination.pageNumber.first = first;
      this.pagination.pageNumber.second = second;
      this.pagination.pageNumber.third = third;
      this.pagination.pageNumber.four = four;
      this.pagination.pageNumber.five = five;
    },
    selectPage(index, pageNumber, side) {
      this.currentPage = pageNumber;
      this.pagination.side = side;
    },
    dotHandaler(first, last) {
      this.pagination.spreed.firstDot = first;
      this.pagination.spreed.lastDot = last;
    },
    getFirstPage() {
      this.changePage(1, 2, 3, 4, 5);
      this.pagination.isActivePage = 1;
      this.currentPage = 1;
      this.disableArrowHandaler(true, false);
      this.dotHandaler(false, true);
    },
    getLastPage() {
      let pages = this.pagination.numberOfPages;
      if (pages > 5) {
        this.changePage(pages - 4, pages - 3, pages - 2, pages - 1, pages);
        this.pagination.isActivePage = 5;
        this.currentPage = pages;
        this.disableArrowHandaler(false, true);
        this.dotHandaler(true, false);
      } else {
        this.pagination.isActivePage = pages;
        this.currentPage = pages;
        this.disableArrowHandaler(false, true);
        this.dotHandaler(false, false);
      }
    },
    getPreviousPage(side) {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.pagination.side = side;
      } else {
        return false;
      }
    },
    getLatterPage(side) {
      if (this.currentPage < this.pagination.numberOfPages) {
        this.currentPage += 1;
        this.pagination.side = side;
      } else {
        return false;
      }
    },
    sendPageLimit(page, limit) {
      EventBus.$emit(this.config.funcName, { page: page, limit: limit });
    },
  },
  watch: {
    currentPage: function(page) {
      let pages = this.pagination.numberOfPages,
        side = this.pagination.side;

      this.sendPageLimit(page, this.limit);

      switch (page) {
        case pages: {
          this.disableArrowHandaler(false, true);
          break;
        }
        case 1: {
          this.disableArrowHandaler(true, false);
          break;
        }
        default: {
          this.disableArrowHandaler(false, false);
          break;
        }
      }
      if (this.pagination.numberOfPages > 5) {
        if (page < 4) {
          this.changePage(1, 2, 3, 4, 0);
          this.dotHandaler(false, true);
          this.pagination.isActivePage = page;
        } else if (page > pages - 3) {
          this.changePage(0, pages - 3, pages - 2, pages - 1, pages);
          this.dotHandaler(true, false);
          let activePage = (this.pagination.isActivePage = page % 5);
          if (activePage === 0) {
            this.pagination.isActivePage = 5;
          } else {
            this.pagination.isActivePage = activePage;
          }
        } else {
          this.dotHandaler(true, true);
          this.pagination.isActivePage = 3;
          switch (side) {
            case 'left': {
              this.changePageNumber(-1, -1, -1, -1, -1);
              break;
            }
            case 'right': {
              this.changePageNumber(1, 1, 1, 1, 1);
              break;
            }
            default: {
              break;
            }
          }
        }
      } else {
        this.pagination.isActivePage = page;
      }
    },
    limit: function(limit) {
      this.sendPageLimit(this.currentPage, limit);
    },
  },
};
</script>
<style scoped>
@import './Pagination.css';
</style>
