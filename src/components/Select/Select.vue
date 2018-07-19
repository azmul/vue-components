<template>
    <div>
        <select :multiple="multiSelect" v-model="inputVal">
          <option 
                 v-for="(option,index) in options" 
                 :disabled="option.disabled"
                 :key="index" 
                 :value="option.value">
                 {{option.text}}
            </option>
          <slot></slot>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['value',
                'config'],
        data() {
            return {
                inputVal: this.value,
                multiSelect: this.config.multiSelect,
                options:[]
            }
        },
        created(){
            this.options = this.config.options;
        },
        watch: {
            inputVal(val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style scoped>
    @import './Select.css';
</style>


