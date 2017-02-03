//Creates a table cell for each value in key in the item
<template>
    <tr>
        <td v-for="(value, key, index) in item" :key="index">{{value}}</td>
    </tr>
</template>

<script>
export default {
    name: 'dataTableRow',
    props: [ 'item' ]
}
</script>

<style scoped>
</style>