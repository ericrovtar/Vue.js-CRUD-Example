<template>
    <div>
        <div class="[ flex justify-content--flex-start ] add-bottom-margin">
            <div>
                <a title="Add Entry"
                    v-if="selectedItems.length > 0"
                    class="cta disabled">
                    <i class="fa fa-plus"></i> Add Contact&hellip;
                </a>

                <a title="Add Entry"
                    v-else
                    class="cta" 
                    @click="changeView('add')">
                    <i class="fa fa-plus"></i> Add Contact&hellip;
                </a>
            </div>

            <div>
                <a title="Edit Data"
                    v-if="selectedItems.length !== 1"
                    class="cta disabled">
                    <i class="fa fa-pencil"></i> Edit&hellip;
                </a>

                <a title="Edit Data"
                    v-else
                    class="cta"
                    @click="editRow(selectedItems[0])">
                    <i class="fa fa-pencil"></i> Edit&hellip;
                </a>
            </div>

            <div>
                <a title="Delete Data"
                    v-if="selectedItems.length < 1"
                    class="cta disabled">
                    <i class="fa fa-remove"></i> Delete
                </a>

                <a title="Delete Data"
                    v-else
                    class="cta"
                    :class="selectedItems.length < 1 ? 'disabled' : ''"
                    @click="deleteRows">
                    <i class="fa fa-remove"></i> Delete
                </a>
            </div>

            <div>
                <a title="Filter Data"
                    class="cta"
                    :class="showFilter ? 'active' : ''"
                    @click="toggleFilter">
                    <i class="fa fa-filter"></i> Filter
                </a>
            </div>

            <div>
                <a title="Choose Columns to Display"
                    class="cta"
                    :class="showColumnSelect ? 'active' : ''"
                    @click="toggleColumnSelect">
                    <i class="fa fa-columns"></i> Columns
                </a>
            </div>
        </div>

        <div>
            <transition name="fade">
                <div v-if="showFilter" class="box--dark-gray add-bottom-margin">
                    <div class="add-padding">      
                        <div class="bold">
                            Filter
                        </div>

                        <div>
                            What Column Are We Searching In?
                            <select v-model="filterProperty">
                                <option v-for="(value, key, index) in dataProperties" 
                                    :key="index" 
                                    :value="key">
                                    {{ value.value }}
                                </option>
                            </select>
                        </div>

                        <div>
                            What Are We Searching For?
                            <input type="text" v-model="filterText" />
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
                        <div class="flex wrap">
                            <div v-for="(value, key, index) in dataProperties"
                                class="one-third">
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
                        <th id="table-controls"></th>
                    </tr>
                </thead>
                <transition-group name="flip-list" tag="tbody">
                    <dataTableRow v-for="item in filteredSortedData" 
                        :key="item.id" 
                        :item="item"
                        :dataProperties="dataProperties"
                        @toggleSelect="itemSelectToggle(item.id)" />
                </transition-group>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DataTableRow from './DataTableRow';

export default {
    name: 'dataTable',
    props: [ 'data', 'dataProperties' ],
    components: {
        DataTableRow
    },
    data () {
        return {
            showFilter: false,
            filterProperty: '',
            filterText: '',
            showColumnSelect: false,
            sortProperty: 'last_name',
            sortOrder: 'asc',
            selectedItems: []
        }
    },
    computed: {
        filteredSortedData: function () {
            return this.sort(this.filter(this.data.data));
        }
    },
    methods: {
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
                //Make sure we have a filter set
                if (this.filterProperty !== '' && this.filterText !== '') {
                    let _this = this;

                    return data.filter(function (data) {
                        // console.log(data);
                        return data[_this.filterProperty].includes(_this.filterText);
                    });
                }
            }

            //Nothing to filter, return the whole set
            return data;
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
        editRow: function(itemId) {
            let item = this.findItem(itemId);

            //Change view to edit item
            this.$emit('changeView', { view: 'edit', item: item });
        },
        deleteRows: function() {
            //Make `this` available inside forEach
            let _this = this;

            //Iterated through each selected item
            this.selectedItems.forEach(function (itemId) {
                _this.deleteRow(itemId);
            });

            //Reload data
            this.$emit('save', this.item);
            //this.$emit('changeView', { view: 'table' });
        },
        deleteRow: function(itemId) {
            //Delete item from data
            let item = this.findItem(itemId);
            let index = this.data.data.findIndex(function (item) {
                return item.id === itemId;
            });
            this.data.data.splice(index, 1);

            //Delete record from database
            this.deleteFromDatabase(itemId);
        },
        deleteFromDatabase: function(itemId) {
            //Post New Data
            let url = `https://challenge.acstechnologies.com/api/contact/${itemId}`;
            let headers = { 'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg' };

            axios.delete(url, {
                headers: headers
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log('Request failed: ', error);
            });
        }
    }
}
</script>

<style scoped>
</style>