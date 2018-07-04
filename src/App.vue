<template>
  <div id="app">
    <Table v-bind:url="url" />
  </div>
</template>

<script>
import Table from './components/Table/Table.vue';

export default {
  name: 'app',
  components: {
    Table
  },
  data(){
    return{
      url: 'https://jsonplaceholder.typicode.com/posts'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
