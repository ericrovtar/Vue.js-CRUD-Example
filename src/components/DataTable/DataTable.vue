/***************
 * Displays a table of data with editing and view options
 *
 * data:           the data to populate the table with
 *
 * dataProperties: an array of properties related to each database entry,
 *                 including required fields and required patterns
 *
 * $emits: confirmation, save, changeView
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
                     @click="changeView('add')">
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

                        <div class="add-bottom-margin">
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
                                <input type="checkbox"
                                    v-model="dataProperties[key].showDefault"
                                    :value="key">
                                    {{ value.value }}
                                </input>
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
                        :item="item"
                        :dataProperties="dataProperties"
                        @toggleSelect="itemSelectToggle(item.id)" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ModalDialog from '../_Common/ModalDialog';
import CTA from '../_Common/CTA';
import DataTableRow from './DataTableRow';

export default {
    name: 'dataTable',
    props: [ 'data', 'dataProperties' ],
    components: {
        DataTableRow,
        ModalDialog,
        CTA
    },
    data () {
        return {
            showFilter: false,
            filterProperty: '',
            filterText: '',
            showColumnSelect: false,
            sortProperty: 'last_name',
            sortOrder: 'asc',
            selectedItems: [],
            dialogStatus: false,
            dialogOptions: [],
            dialogText: null
        }
    },
    computed: {
        filteredSortedData: function () {
            return this.sort(this.filter(this.data.data));
        }
    },
    methods: {
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
        itemSelectToggle: function(id) {
            //See if id exists in `selectedItems`
            let i = this.selectedItems.indexOf(id);
            if (i >= 0) {
                //Remove it
                this.selectedItems.splice(i, 1);
            }
            else {
                //Add it
                this.selectedItems.push(id);
            }
        },
        toggleFilter: function() {
            this.showFilter = !this.showFilter;
        },
        toggleColumnSelect: function() {
            this.showColumnSelect = !this.showColumnSelect;
        },
        filter: function(data) {
            //Make sure data has loaded to table
            if (data !== undefined) {
                try {
                    //Make sure we have a filter set
                    if (!String.isNullOrWhitespace(this.filterProperty) && !String.isNullOrWhitespace(this.filterText)) {
                            let _this = this;

                            return data.filter(function (data) {
                                // console.log(data);
                                return data[_this.filterProperty].toString().includes(_this.filterText);
                            });
                        
                    }
                }
                catch(err) {
                    console.log(err);
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
        compareObjects: function(obj1, obj2) {
            if (obj1[this.sortProperty] === null || obj1[this.sortProperty] === undefined) {
                return -1;
            }
            else if (obj2[this.sortProperty] === null || obj2[this.sortProperty] === undefined){
                return 1;
            }
            else {
                //Compare based on type
                if (typeof obj1[this.sortProperty] === "string") {
                    return obj1[this.sortProperty].localeCompare(obj2[this.sortProperty]);
                }
                else if (typeof obj1[this.sortProperty] === "number") {
                    return obj1[this.sortProperty] > obj2[this.sortProperty];
                }
                else {
                    //Try turning the item into a string
                    return obj1[this.sortProperty].toString().localeCompare(obj2[this.sortProperty].toString());
                }
            }
        },
        sort: function(data) {
            if (data !== undefined) {
                let _this = this;
                
                return data.sort(function(obj1, obj2) {
                    //Check for sort order
                    if (_this.sortOrder === 'asc') {
                        return _this.compareObjects(obj1, obj2);
                    }
                    else {
                        return _this.compareObjects(obj2, obj1);
                    }
                });
            }
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
        changeView: function(view) {
            this.$emit('changeView', { view: view });
        },
        findItem: function(itemId) {
            //Make `itemId` available in `find`
            let _itemId = itemId;
            
            return this.data.data.find(function (item) {
                return item.id === _itemId;
            });
        },
        viewRow: function(itemId) {
            let item = this.findItem(itemId);

            //Change view to view item
            this.$emit('changeView', { view: 'view', item: item });
        },
        editRow: function(itemId) {
            let item = this.findItem(itemId);

            //Change view to edit item
            this.$emit('changeView', { view: 'edit', item: item });
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

            //Make `this` available inside forEach
            let _this = this;
            let requests = [];

            //Iterated through each selected item
            while (this.selectedItems.length > 0) {
                let itemId = this.selectedItems.shift();
                requests.push(_this.deleteRowRequest(itemId));
            }

            axios.all(requests)
                .then(axios.spread(
                    function() {
                        _this.updateParentConfirmation(
                            'success',
                            `Success! The selected items were deleted.`
                        );

                        //Trigger data reload
                        _this.$emit('save');
                        
                        _this.$ScrollToTop;
                    })
                )
                .catch(function (error) {
                    console.log('Request failed: ', error);

                    //Show error message
                    _this.updateConfirmation(
                        'error',
                        `Oops! Something didn't go as expected. Please try again.`
                    );

                    _this.$ScrollToTop;
                });  
        },
        deleteRowRequest: function(itemId) {
            let url = `https://challenge.acstechnologies.com/api/contact/${itemId}`;
            let headers = { 'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg' };

            return axios.delete(url, {
                headers: headers
            });
        },
    }
}
</script>

<style scoped>
</style>