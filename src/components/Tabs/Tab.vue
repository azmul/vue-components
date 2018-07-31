<template>
    <div v-show="isActive" class="overflow-y-scroll h-64" v-bind:class="{ 'inactive-tab': !isActive, 'active-tab': isActive }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                required: true
            },
            selected: {
                default: false
            }
        },
        data() {
            return {
                isActive: false
            };
        },
        computed: {
            href() {
                return '#' + this.name.toLowerCase().replace(/ /g, '-');
            }
        },
        mounted() {
            this.isActive = this.selected;
    
        }
    }
</script>

<style scoped>
    .inactive-tab {
        transition: opacity 1s cubic-bezier(.42, 0, .34, 1.01);
        opacity: 0;
    }
    
    .active-tab {
        opacity: 1;
    }
</style>
