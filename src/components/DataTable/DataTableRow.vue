/***************
 * Creates a table cell for each value in key in the item
 *
 * item:           the item to populate the table row with
 *
 * dataProperties: an array of properties related to each database entry,
 *                 including required fields and required patterns
 *
 * $emits: toggleSelect
 **/
<template>
    <tr :class="selected ? 'selected' : ''">
        <td headers="row-select" class="white-space--no-wrap">
            <Checkbox v-model="selected" @click="toggleSelect" />
        </td>
        
        <td v-for="(value, key, index) in item" 
            v-if="dataProperties[key].showDefault"
            :key="index"
            :headers="key">
            {{value}}
        </td>

        <div v-if="false">
            <td headers="table-controls" class="white-space--nowrap">
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
        </div>
    </tr>
</template>

<script>
import Checkbox from '../_Common/Checkbox';

export default {
    name: 'dataTableRow',
    props: [ 'item', 'dataProperties' ],
    components: {
        Checkbox
    },
    data () {
        return {
            selected: false
        }
    },
    methods: {
        toggleSelect: function() {
            console.log("Hi");
            //this.selected = !this.selected;

            this.$emit('toggleSelect');
        },
        // editRow: function() {
        //     this.$emit('edit');
        // },
        // deleteRow: function() {
        //     this.$emit('delete');
        // }
    },
    mounted() {
        //console.log(this.dataProperties);
    }
}
</script>

<style scoped>
</style>