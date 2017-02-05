<template>
    <div>
        <div class="[ flex justify-content--flex-start ] add-bottom-margin">
            <div>
                <a title="Add Entry"
                    class="cta" 
                    @click="changeView('add')">
                    <i class="fa fa-plus"></i> Add Contact&hellip;
                </a>
            </div>

            <div>
                <a title="Filter Data"
                    class="cta"
                    :class="showFilter ? 'active' : ''"
                    @click="toggleFilter">
                    <i class="fa fa-filter"></i> Filter Data
                </a>
            </div>

            <div>
                <a title="Choose Columns to Display"
                    class="cta"
                    :class="showColumnSelect ? 'active' : ''"
                    @click="toggleColumnSelect">
                    <i class="fa fa-columns"></i> Choose Columns
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
                        @edit="editRow(item)"
                        @delete="deleteRow(item.id)" />
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
            sortOrder: 'asc'
        }
    },
    computed: {
        filteredSortedData: function () {
            return this.sort(this.filter(this.data.data));
        }
    },
    methods: {
        // loadProperties: function(sampleItem) {
        //     for (let prop in sampleItem) {
        //         this.dataProperties.push({
        //             value: this.formatKey(prop),
        //             key: prop
        //         })
        //     };

        //     console.log(this.dataProperties);
        // },
        // formatKey: function(key) {
        //     return key.replace('_', ' ').capitalizeFirstLetter();
        // },
        toggleFilter: function() {
            this.showFilter = !this.showFilter;
        },
        toggleColumnSelect: function() {
            this.showColumnSelect = !this.showColumnSelect;
        },
        filter: function(data) {
            console.log('filtering');

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
            console.log('sorting');

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
        editRow: function(item) {
            this.$emit('changeView', { view: 'edit', item: item });
        },
        changeView: function(view) {
            this.$emit('changeView', { view: view });
        },
        deleteRow: function(itemId) {
            //Delete record
            this.deleteFromDatabase(itemId);

            //Reload data
            this.$emit('save', this.item);
            //this.$emit('changeView', { view: 'table' });
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