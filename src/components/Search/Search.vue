<template>
    <div id="search">
        <div class="search-wrapper">
            <input @focus="toggleOnOff" @blur="toggleOnOff" type="text" v-model="keyword" placeholder="Search Title.." />
            <label for=""> Search Title </label>
            <div></div>
            <select v-if="selectHandalerShow" :multiple="true" v-model="inputVal">
                                              <option 
                                                     v-for="(option,index) in filteredList" 
                                                     :disabled="option.disabled"
                                                     :key="index" 
                                                     :value="option.firstname">
                                                     {{option.firstname}}
                                                </option>
                                              <slot></slot>
                                        </select>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectHandalerShow: false,
                keyword: '',
                inputVal: [],
                datas: [],
                postList: [{
                        isActive: true,
                        age: 40,
                        firstname: 'Dickerson',
                        lastname: 'Macdonald',
                        date: '2011-04-11T10:20:30Z'
                    },
                    {
                        isActive: false,
                        age: 21,
                        firstname: 'Larsen',
                        lastname: 'Shaw',
                        date: '2011-04-08T10:20:30Z'
                    },
                    {
                        isActive: false,
                        age: 89,
                        firstname: 'Geneva',
                        lastname: 'Wilson',
                        date: '2010-04-11T10:20:30Z',
                        testFiled: true
                    },
                    {
                        isActive: true,
                        age: 38,
                        firstname: 'Jami',
                        lastname: 'Carney',
                        date: '2011-04-15T10:20:30Z'
                    }, {
                        isActive: true,
                        age: 40,
                        firstname: 'Azmul',
                        lastname: 'Hossain',
                        date: '2011-04-11T10:20:30Z'
                    },
                    {
                        isActive: false,
                        age: 22,
                        firstname: 'Nazmul',
                        lastname: 'Hasan',
                        date: '2011-04-08T10:20:30Z'
                    },
                    {
                        isActive: false,
                        age: 80,
                        firstname: 'Polin',
                        lastname: 'Ahmed',
                        date: '2010-04-11T10:20:30Z',
                        testFiled: true
                    },
                    {
                        isActive: true,
                        age: 34,
                        firstname: 'Nafi',
                        lastname: 'Hasan',
                        date: '2011-04-15T10:20:30Z'
                    }
                ]
    
            }
        },
        methods: {
            toggleOnOff() {
                setTimeout(() => {
                    this.selectHandalerShow = !this.selectHandalerShow;
                }, 150)
            },
            filteredListData(keywordSearch) {
                let filterAfter = this.postList.filter((data) => {
                    return data.firstname.toLowerCase().includes(keywordSearch.toLowerCase());
                });
                this.datas = filterAfter;
            },
            filteredListHandelar(searchValue) {
                let keywordSearch;
                if (searchValue instanceof Array) {
                    keywordSearch = searchValue[0];
                    this.filteredListData(keywordSearch);
                } else {
                    keywordSearch = searchValue;
                    this.filteredListData(keywordSearch);
                }
            }
        },
        created() {
            this.datas = [...this.postList];
        },
        computed: {
            filteredList() {
                return this.datas;
            }
        },
        watch: {
            inputVal: function(newValue, oldValue) {
                this.keyword = newValue;
                console.log(newValue, oldValue);
            },
            keyword: function(newValue, oldValue) {
                this.filteredListHandelar(newValue);
            }
        }
    }
</script>

<style scoped>
    
</style>


