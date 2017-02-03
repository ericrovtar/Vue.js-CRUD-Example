<template>
  <div id="app">
    <dataTable></dataTable>
  </div>
</template>

<script>
import DataTable from './components/DataTable/DataTable'

export default {
  name: 'app',
  components: {
    DataTable
  }
}
</script>

<style>
@import url('./styles/styles.css');
</style>
