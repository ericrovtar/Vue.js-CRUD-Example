//Creates a table cell for each value in key in the item
<template>
    <tr>
        <td v-for="(value, key, index) in item" 
            :key="index"
            :headers="key">
            {{value}}
        </td>

        <td><input type="button" value="Edit" v-on:click="edit" /></td>
    </tr>
</template>

<script>
export default {
    name: 'dataTableRow',
    props: [ 'item' ],
    methods: {
        edit: function() {
            console.log("edit");
            this.$emit('edit');
        }
    }
}
</script>

<style scoped>
</style>