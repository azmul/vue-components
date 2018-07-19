<template>
    <div class="overlay">
        <div class="search-wrapper">
            <input class="input-field" 
                   @focus="toggleOnOff" 
                   @blur="toggleOnOff" 
                   type="text" 
                   v-model="keyword" 
                   placeholder="Search Title.." />
                   <span></span>
            <select 
                  class="select-field" 
                  v-if="selectHandalerShow" 
                  :multiple="true" 
                  v-model="inputVal">
                <option 
                        v-if="filteredList.length>0"
                        v-for="(option,index) in filteredList" 
                        :disabled="option.disabled"
                        :key="index" 
                        :value="option"
                        v-bind:class="{'optionClass': !option.disabled,'optionInactiveClass':option.disabled}">
                        {{option.text}}
                </option>
                <option v-if="filteredList.length===0">{{noResultFound}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['value',
            'config'
        ],
        data() {
            return {
                options: [],
                selectHandalerShow: false,
                noResultFound:'No results found',
                keyword: '',
                inputVal: [],
                datas: [],
                dataList: this.config.options,
                selectChange: false
    
            }
        },
        methods: {
            toggleOnOff() {
                setTimeout(() => {
                    this.selectHandalerShow = !this.selectHandalerShow;
                }, 150)
            },
            filteredListData(keywordSearch) {
                let filterAfter = this.dataList.filter((data) => {
                    return data.text.toLowerCase().includes(keywordSearch.toLowerCase());
                });
                this.datas = filterAfter;
            },
            filteredListHandelar(searchValue) {
                let keywordSearch;
                if (searchValue.constructor === Object) {
                    keywordSearch = searchValue.text;
                    this.filteredListData(keywordSearch);
                } else if (searchValue.constructor === Array) {
                    keywordSearch = searchValue[0].text;
                    this.filteredListData(keywordSearch);
                } else {
                    this.filteredListData(searchValue);
                }
            }
        },
        created() {
            this.datas = [...this.dataList];
        },
        computed: {
            filteredList() {
                return this.datas;
            }
        },
        watch: {
            inputVal: function(newValue) {
                if (newValue.constructor === Object) {
                    this.selectChange = true;
                    this.keyword = newValue.text;
                    this.$emit('input', newValue.value);
                }
                if (newValue.constructor === Array) {
                    this.selectChange = true;
                    this.keyword = newValue[0].text;
                    this.$emit('input', newValue[0].value);
                }
            },
            keyword: function(newValue) {
                if (!this.selectChange) {
                    this.filteredListHandelar(newValue);
                } else {
                    this.selectChange = false;
                }
            }
        }
    }
</script>

<style scoped>
    @import './Search.css';
</style>


