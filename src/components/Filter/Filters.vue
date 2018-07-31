<template>
    <div>
        <!-- <div v-for="(items,finalIndex) in finalHtml" :key="finalIndex">
                <div v-html="items.name"></div>
                <div v-html="item" v-for="(item,index) in items.value" :key="index"></div>
            </div> -->
        <div v-for="(items,finalIndex) in finalHtml" :key="finalIndex">
            <div>{{items.vModel}}</div>
            <div v-for="(item,index) in items.value" :key="index">
                <input type="checkbox" :id="item" v-model="items.vModel" :value="item" checked />
                <label :for="item">{{item}}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            config: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                finalHtml: [],
                watchElement: [],
                experiencelabel: []
            }
        },
        methods: {
            createCheckBox(elementInfo) {
               // console.log(elementInfo);
                let checkBox = [],
                    checkboxElement,
                    label,
                    eleObj = {},
                    name;
    
                // label = `<div>${elementInfo.name}</div>`;
                // name = elementInfo.vModel;
                // for (let index = 0; index < elementInfo.value.length; index++) {
                //     checkboxElement =   `<input type="checkbox" id=${elementInfo.value[index]} v-model=${name}
                //                                     value=${elementInfo.value[index]} checked />
                //                                 <label for=${elementInfo.value[index]}>${elementInfo.value[index]}</label>`;
                //     checkBox.push(checkboxElement);
                // }
                eleObj.name = label;
                eleObj.value = checkBox;
                //this.finalHtml.push(eleObj);
                this.finalHtml.push(elementInfo);
            },
    
        },
        created() {
            let vModel;
            this.config.forEach((item, index) => {
                vModel = item.name.toLowerCase().replace(/\s+/g, '');
                //let vModel = [];
                this.$data[`${vModel}`] = []
                console.log(this.$data);
                //this.config[index] = vModel;
                switch (item.type) {
                    case 'text':
                        {
                            break;
                        }
                    case 'checkbox':
                        {
                            this.createCheckBox(this.config[index]);
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            })
        },
        watch: {
            experiencelabel: function(newValue) {
                console.log(newValue);
            }
        }
    }
</script>

<style>
    @import './Filter.css';
</style>

