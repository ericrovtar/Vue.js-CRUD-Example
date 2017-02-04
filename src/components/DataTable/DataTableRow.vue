//Creates a table cell for each value in key in the item
<template>
    <tr>
        <td v-for="(value, key, index) in item" 
            v-if="dataProperties[key].showDefault"
            :key="index"
            :headers="key">
            {{value}}
        </td>

        <td headers="table-controls">
            <a title="Edit"
                @click="editRow"
                class="cursor--pointer text--medium-blue">
                <i class="fa fa-pencil"></i>
            </a>
            <a title="Delete"
                @click="deleteRow"
                class="cursor--pointer text--medium-blue">
                <i class="fa fa-remove"></i>
            </a>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'dataTableRow',
    props: [ 'item', 'dataProperties' ],
    methods: {
        editRow: function() {
            this.$emit('edit');
        },
        deleteRow: function() {
            this.$emit('delete');
        }
    },
    mounted() {
        //console.log(this.dataProperties);
    }
}
</script>

<style scoped>
</style>