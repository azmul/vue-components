<template>
    <div>
        <div v-if="loadingData" class="loader"></div>
        <div>
            <table v-if="!loadingData" id="dynamic-table">
                <tr>
                    <th v-if="table.editableColumnName" v-bind:class="{'cursor-pointer': column.sortable && table.sortable }" v-for="(column, index) in table.editableHeaderColumnsNumbers" :key="index" @click="sortHandaler(column)">
                        <span>{{column.label}}</span>
                    </th>
                    <th v-if="!table.editableColumnName" v-bind:class="{'cursor-pointer': table.sortable }" v-for="(column, index) in table.columns" :key="index" @click="sortHandaler(column)">
                        <span>{{column}}</span>
                    </th>
                </tr>
                <tr v-for="(item, index) in table.items" :key="index">
                    <td  v-if="table.editableColumnName" v-for="(column, index) in table.editableHeaderColumnsNumbers" :key="index" v-bind:contenteditable="table.editable">
                        <span v-if="column.sortable"><span v-if="column.sortable.type ==='date'">{{ (new Date(item[column.key])).toDateString() }}</span></span>
                        <span v-if="column.sortable"><span v-if="column.sortable.type !=='date'">{{item[column.key]}}</span></span>
                        <span v-else>{{item[column.key]}}</span>
                    </td>
                    <td v-if="!table.editableColumnName" v-for="(column, index) in table.columns" :key="index" v-bind:contenteditable="table.editable">
                        <span>{{item[column]}}</span>
                    </td>
                </tr>
            </table>
            <div class="pagination">
                <a href="#" @click="getFirstPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstArrow}]">&laquo;</a>
                <a href="#" @click="getPreviousPage('left')" v-bind:class="[pagination.size,{'disabled': pagination.disableField.firstArrow}]">&lsaquo;</a>
    
                <a v-if="pagination.page.page1" href="#" @click="selectPage(1,pagination.pageNumber.first)" v-bind:class="[pagination.size, { active: pagination.isActivePage === 1}]">
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
                <a v-if="pagination.page.page5" href="#" @click="selectPage(5,pagination.pageNumber.five)" v-bind:class="[pagination.size,{ active: pagination.isActivePage === 5}]">
                    <span v-if="!pagination.spreed.lastDot">{{pagination.pageNumber.five}}</span>
                    <span v-if="pagination.spreed.lastDot">...</span>
                </a>
    
                <a href="#" @click="getLatterPage('right')" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastArrow}]">&rsaquo;</a>
                <a href="#" @click="getLastPage()" v-bind:class="[pagination.size,{'disabled': pagination.disableField.lastArrow}]">&raquo;</a>
                <!-- <p>Current Page:{{this.currentPage}}</p> -->
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
        props: {
            config: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                currentPage: this.config.paginationConfig.currentPage || 1,
                limit: this.config.paginationConfig.perPages || 10,
                loadingData: false,
                table: {
                    columns: [],
                    editableColumnName: false,
                    editableHeaderColumnsNumbers: [],
                    editable: false,
                    sortable: false,
                    fields: {},
                    items: []
                },
                pagination: {
                    numberOfPages: Math.ceil(this.config.paginationConfig.totalRows / this.config.paginationConfig.perPages) || 1,
                    isActivePage: 1,
                    size: this.config.paginationConfig.size,
                    side: null,
                    sideClick: false,
                    page: {
                        page1: false,
                        page2: false,
                        page3: false,
                        page4: false,
                        page5: false
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
                        five: 5
                    },
                    spreed: {
                        firstDot: false,
                        lastDot: true
                    }
                }
            }
        },
        created() {
    
            if (this.config.url && this.config.url !== '') {
                this.serverCallForData(this.config);
            } else {
                this.tableExecuteHadaler(this.config);
            }
    
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
            sortHandaler(columnInfo) {
                let sortKey = null;
                if (this.table.sortable) {
                    if (this.table.editableColumnName) {
                        if (columnInfo.sortable) {
                            sortKey = columnInfo.key;
                        }
                    } else {
                        sortKey = columnInfo;
                    }
                    if (columnInfo.sortable.type === 'date') {
                        return this.table.items.sort((a, b) => {
                            return new Date(a[sortKey]) - new Date(b[sortKey]);
                        });
                    } else {
                        this.table.items.sort((a, b) => {
                            if (a[sortKey] > b[sortKey]) {
                                return 1;
                            }
                            if (a[sortKey] < b[sortKey]) {
                                return -1;
                            }
                            return 0;
                        });
                    }
    
                } else {
                    return 0;
                }
            },
            async serverCallForData(configObject) {
                this.loadingData = true;
                let page = this.currentPage;
                let limit = this.limit;
                let baseUrl = configObject.url;
                let url = `${baseUrl}?_page=${page}&_limit=${limit}`;
                let response = await axios.get(url);
                this.loadingData = false;
                configObject.items = response.data;
                this.tableExecuteHadaler(configObject);
                
            },
            tableExecuteHadaler(configObject) {
                if (configObject.items.length > 0) {
                    this.table.items = configObject.items;
                    this.table.editable = configObject.editable;
                    this.table.sortable = configObject.sortable;
                    let headerColumnsNumber = [];
                    let maxIndex = 0,
                        maxNumber = 0;
    
                    if (configObject.fields) {
                        if (Object.keys(configObject.fields).length > 0) { // fields configuration true
                            let keys = Object.keys(configObject.fields);
                            for (let index = 0; index < keys.length; index++) {
                                headerColumnsNumber.push({
                                    key: keys[index],
                                    label: configObject.fields[keys[index]]['label'],
                                    sortable: configObject.fields[keys[index]]['sortable']
                                });
                            }
                            this.table.editableColumnName = true;
                            this.table.editableHeaderColumnsNumbers = headerColumnsNumber;
                        }
                    }
    
                    for (let index = 0; index < configObject.items.length; index++) {
                        let itemLength = Object.keys(configObject.items[index]).length;
                        if (maxNumber < itemLength) {
                            maxNumber = itemLength;
                            maxIndex = index;
                        }
                    }
                    this.table.columns = Object.keys(configObject.items[maxIndex]);
                }
            },
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
    
            }
        },
        watch: {
            currentPage: function(page) {
                let pages = this.pagination.numberOfPages,
                    side = this.pagination.side;
    
                this.serverCallForData(this.config); // call to server
    
                switch (page) {
                    case pages:
                        {
                            this.disableArrowHandaler(false, true);
                            break;
                        }
                    case 1:
                        {
                            this.disableArrowHandaler(true, false);
                            break;
                        }
                    default:
                        {
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
                        let activePage = this.pagination.isActivePage = page % 5;
                        if (activePage === 0) {
                            this.pagination.isActivePage = 5;
                        } else {
                            this.pagination.isActivePage = activePage;
                        }
                    } else {
                        this.dotHandaler(true, true);
                        this.pagination.isActivePage = 3;
                        switch (side) {
                            case 'left':
                                {
                                    this.changePageNumber(-1, -1, -1, -1, -1);
                                    break;
                                }
                            case 'right':
                                {
                                    this.changePageNumber(1, 1, 1, 1, 1);
                                    break;
                                }
                            default:
                                {
                                    break;
                                }
                        }
                    }
                } else {
                    this.pagination.isActivePage = page;
                }
            }
        }
    }
</script>

<style scoped>
    @import './TableWithPagination.css';
</style>


