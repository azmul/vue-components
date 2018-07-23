<template>
    <div class="overlay">
        <div class="search-wrapper">
            <div class="select-div">
                <span v-for="(data,selectedDataIndex) in selectedData" :key="selectedDataIndex" class="select-span"> 
                        <a href="#" v-on:click="deleteSelected(data.index,selectedDataIndex)" class="close"></a> <span class="select-text">{{data.text}}</span>
                </span>
            </div>
            <input class="input-field" 
                   @focus="toggleOnOff" 
                   @blur="toggleOnOff" 
                   type="text" 
                   v-model="keyword" 
                   :placeholder="title"
                   v-bind:autofocus="autofocusHandaler" 
                   ref='search'/>
    
            <select class="select-field" v-if="selectHandalerShow" :multiple="true" v-model="inputVal">
                    <option 
                            v-if="filteredList.length>0 && !option.selected"
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
                noResultFound: 'No results found',
                keyword: '',
                inputVal: [],
                datas: [],
                dataList: this.config.options,
                selectChange: false,
                selectedData: [],
                autofocusHandaler: true
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
            },
            deleteSelected(index,selectedDataIndex) {
                this.datas[index].selected = false;
                this.selectedData.splice(selectedDataIndex, 1);
                this.$refs.search.focus();
            }
        },
        created() {
            for (let index = 0; index < this.dataList.length; index++) {
                this.dataList[index].selected = false;
                this.dataList[index].index = index;
            }
            this.datas = [...this.dataList];
        },
        computed: {
            filteredList() {
                return this.datas;
            },
            title() {
                return this.selectedData.length > 0 ? '' : 'Select your favourites...';
            }
        },
        watch: {
            inputVal: function(newValue) {
                if (newValue.constructor === Array) {
                    this.$refs.search.focus();
                    if (newValue.length > 0) {
                        this.selectChange = true;
                        this.keyword = '';
                        let newObj = newValue[0];
                        let idx = newObj["index"];
                        this.datas[idx].selected = true;
                        this.selectedData.push({
                            value: newValue[0].value,
                            text: newValue[0].text,
                            index: idx
                        });
                        this.$emit('input', this.selectedData);
                    } else {
                        return false;
                    }
    
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
    @import './Multiselect.css';
</style>


