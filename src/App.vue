<template>
  <div id="app">
    <dataTable></dataTable>
  </div>
</template>

<script>
import DataTable from './components/DataTable'

export default {
  name: 'app',
  components: {
    DataTable
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
