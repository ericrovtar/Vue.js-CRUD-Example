/***************
 * Creates a table cell for each value in key in the item
 *
 * item:           the item to populate the table row with
 **/
<template>
    <tr :class="selected ? 'selected' : ''">
        <td headers="row-select" class="white-space--no-wrap">
            <Checkbox 
                v-model="selected" 
                @click="toggleSelectedItem({ itemId: item.id })" />
        </td>
        
        <td v-for="(value, key, index) in item" 
            v-if="dataProperties[key].showDefault"
            :key="index"
            :headers="key">
            {{value}}
        </td>
    </tr>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import Checkbox from '../_Common/Checkbox';

export default {
    name: 'dataTableRow',
    props: [ 'item' ],
    components: {
        Checkbox
    },
    data () {
        return {
            selected: false
        }
    },
    computed: {
        ...mapGetters([
            'dataProperties',
            'selectedItems',
        ]),
    },
    methods: {
        ...mapActions([
            'toggleSelectedItem'
        ]),
    },
}
</script>

<style scoped></style>