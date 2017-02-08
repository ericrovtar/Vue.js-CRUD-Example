/***************
 * Displays a table of data with editing and view options
 *
 * $emits: confirmation
 **/
<template>
    <div>
        <modalDialog 
            :show="dialogStatus"
            :options="dialogOptions"
            :showCancel="true"
            @deleteRows="deleteRows"
            @hideDialog="hideDialog">
            {{ dialogText }}
        </modalDialog>
    
        <div class="[ flex justify-content--flex-start ] add-bottom-margin">
            <div>
                <CTA :state="selectedItems.length > 0 ? 'disabled' : ''" 
                     @click="addRow()">
                    <i class="fa fa-plus"></i> <span class="portable--hide">Add&hellip;</span>
                </CTA>
            </div>

            <div>
                <CTA :state="selectedItems.length !== 1 ? 'disabled' : ''"
                     @click="viewRow(selectedItems[0])">
                    <i class="fa fa-arrow-up rotate-45"></i> <span class="portable--hide">View...</span>
                </CTA>
            </div>

            <div>
                <CTA :state="selectedItems.length !== 1 ? 'disabled' : ''"
                     @click="editRow(selectedItems[0])">
                    <i class="fa fa-pencil"></i> <span class="portable--hide">Edit&hellip;</span>
                </CTA>
            </div>

            <div>
                <CTA :state="selectedItems.length < 1 ? 'disabled' : ''"
                     @click="confirmDelete">
                    <i class="fa fa-remove"></i> <span class="portable--hide">Delete</span>
                </CTA>
            </div>

            <div>
                <CTA :state="showFilter ? 'active' : ''"
                     @click="toggleFilter">
                    <i class="fa fa-filter"></i> <span class="portable--hide">Filter</span>
                </CTA>
            </div>

            <div>
                <CTA :state="showColumnSelect ? 'active' : ''"
                     :class="'portable--hide'"
                     @click="toggleColumnSelect">
                    <i class="fa fa-columns"></i> Columns
                </CTA>
            </div>
        </div>

        <div class="displayControls">
            <transition name="fade">
                <div v-if="showFilter" class="box--dark-gray add-bottom-margin">
                    <div class="add-padding">      
                        <div class="bold">
                            Filter
                        </div>

                        <div>
                            What Column Are We Searching In?
                            <span class="css3-metro-dropdown">
                                <select v-model="filterProperty">
                                    <option v-for="(value, key, index) in dataProperties" 
                                        :key="index" 
                                        :value="key">
                                        {{ value.value }}
                                    </option>
                                </select>
                            </span>
                        </div>

                        <div>
                            What Are We Searching For?
                            <input type="text" v-model="filterText" />
                        </div>

                        <div>
                            <CTA @click="clearFilter">
                                Clear
                            </CTA>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="fade">
                <div v-if="showColumnSelect" class="box--dark-gray add-bottom-margin">
                    <div class="add-padding">    
                        <div class="bold">
                            What Columns Do You Want to See?
                        </div>
                        <div class="columns--3">
                            <div v-for="(value, key, index) in dataProperties">
                                <Checkbox 
                                    :checked="value.showDefault"
                                    @change="toggleColumn(key)">
                                    {{ value.value }}
                                </Checkbox>
                            </div>
                        </div>
                    </div>  
                </div>
            </transition>
        </div>

        <div class="overflow-x--scroll add-bottom-margin">
            <table>
                <thead>
                    <tr>
                        <th id="row-select"></th>
                        <th v-for="(value, key, index) in dataProperties"
                            v-if="value.showDefault"
                            :key="index"
                            :id="key"
                            @click="changeSortProperty(key)"
                            class="cursor--pointer">
                            {{ value.value }}

                            <span v-if="key === sortProperty">
                                <i v-if="sortOrder === 'asc'" class="fa fa-chevron-down"></i>
                                <i v-if="sortOrder === 'desc'" class="fa fa-chevron-up"></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <dataTableRow v-for="item in filteredSortedData" 
                        :key="item.id" 
                        :item="item" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import * as api from '../../api';

import ModalDialog from '../_Common/ModalDialog';
import CTA from '../_Common/CTA';
import Checkbox from '../_Common/Checkbox';

import DataTableRow from './DataTableRow';

export default {
    name: 'dataTable',
    props: [ ],
    components: {
        DataTableRow,
        ModalDialog,
        CTA,
        Checkbox
    },
    data () {
        return {
            showFilter: false,
            filterProperty: '',
            filterText: '',
            showColumnSelect: false,
            sortProperty: 'last_name',
            sortOrder: 'asc',
            dialogStatus: false,
            dialogOptions: [],
            dialogText: null
        }
    },
    computed: {
        ...mapGetters([
            'view',
            'selectedItem',
            'selectedItems',
            'data',
            'dataProperties',
            'newItem',
        ]),
        // dataProperties: {
        //     get () {
        //         return this.$store.state.dataProperties
        //     },
        //     set (value) {
        //         this.$store.commit('changeDataProperty', value)
        //     }
        // },
        filteredSortedData: function () {
            this.sortData({
                data: this.data.data,
                sortOrder: this.sortOrder,
                sortProperty: this.sortProperty 
            });

            return this.filter(this.data.data);
        }
    },
    mounted() {
        this.clearSelectedItems();
    },
    methods: {
        ...mapMutations([
            'changeView',
            'changeSelectedItem',
            'sortData',
            'changeDataProperty',
            'clearSelectedItems'
        ]),
        ...mapActions([
            'toggleSelectedItem',
            'loadData'
        ]),
        updateParentConfirmation: function(status, message) {
            this.$emit('confirmation', {
                status: status,
                message: message
            });
        },
        showDialog: function() {
            this.dialogStatus = true;
        },
        hideDialog: function() {
            this.dialogStatus = false;

            //Clear options
            this.dialogOptions = [];
            this.dialogText = null;
        },
        toggleFilter: function() {
            this.showFilter = !this.showFilter;
        },
        toggleColumnSelect: function() {
            this.showColumnSelect = !this.showColumnSelect;
        },
        toggleColumn: function(key) {
            let value = !this.dataProperties[key].showDefault;

            this.changeDataProperty({ key: key, value: value });
        },
        filter: function(data) {
            //Make sure data has loaded to table
            if (data !== undefined) {
                try {
                    //Make sure we have a filter set
                    if (!String.isNullOrWhitespace(this.filterProperty) && !String.isNullOrWhitespace(this.filterText)) {
                        let _this = this;

                        return data.filter(function (data) {
                            return data[_this.filterProperty].toString().includes(_this.filterText);
                        });
                    }
                }
                catch(err) {
                    return data;
                }
            }

            //Nothing to filter, return the whole set
            return data;
        },
        clearFilter: function() {
            this.filterProperty = '';
            this.filterText = '';
        },
        changeSortProperty: function(property) {
            //Check if property has really changed
            if (property === this.sortProperty) {
                //Change order instead
                this.toggleSortOrder();
            }
            else {
                //Set new sort property
                this.sortProperty = property;

                //Set sort order
                this.setSortOrder('asc');
            }
        },
        setSortOrder: function(order) {
            this.sortOrder = order;
        },
        toggleSortOrder: function() {
            if (this.sortOrder === 'asc') {
                this.setSortOrder('desc');
            }
            else {
                this.setSortOrder('asc');
            }
        },
        addRow: function() {
            this.changeSelectedItem({ item: this.newItem });
            this.changeView({ view: 'add' });
        },
        viewRow: function(itemId) {
            //Change view to view item
            this.changeSelectedItem({ itemId: itemId });
            this.changeView({ view: 'view' });
        },
        editRow: function(itemId) {
            //Change view to edit item
            this.changeSelectedItem({ itemId: itemId });
            this.changeView({ view: 'edit' });
        },
        confirmDelete: function() {
            //Setup dialog options
            this.dialogOptions = [{ 
                text: 'Delete', 
                icon: 'fa-remove', 
                class: 'red',
                emit: 'deleteRows'}];

            this.dialogText = 'Are you sure you want to proceed? You cannot undo this.';

            this.showDialog();
        },
        deleteRows: function() {
            //Hide dialog
            this.hideDialog();

            //Make `this` available inside then
            let _this = this;

            api.deleteItems(
                this.selectedItems,
                function() {
                    _this.updateParentConfirmation(
                        'success',
                        `Success! The selected items were deleted.`
                    );

                    //Clear Selected Items
                    this.clearSelectedItems();

                    //Trigger data reload
                    _this.loadData({
                        catch: function(error) {
                            _this.updateParentConfirmation(
                                'error',
                                `Oops! Something didn't go as expected. Please try again.`
                            );
                        }
                    });
                    
                    _this.$ScrollToTop;
                },
                function (error) {
                    console.log('Request failed: ', error);

                    //Show error message
                    _this.updateConfirmation(
                        'error',
                        `Oops! Something didn't go as expected. Please try again.`
                    );

                    _this.$ScrollToTop;
                }
            );  
        },
    }
}
</script>

<style scoped></style>