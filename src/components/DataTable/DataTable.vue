<template>
    <div>
        <div class="box--dark-gray add-bottom-margin">
            <div class="add-padding">      
                <h1>Display Options</h1>

                <div class="add-bottom-margin">
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

                <div>
                    <div class="bold">
                        What Columns Do You Want to See?
                    </div>
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

        <div class="overflow-x--scroll add-bottom-margin">
            <table>
                <caption>
                    <a title="Add Entry"
                        class="cursor--pointer text--medium-blue" 
                        @click="changeView('add')"><i class="fa fa-plus"></i></a>
                </caption>
                
                <thead>
                    <tr>
                        <th v-for="(value, key, index) in dataProperties"
                            v-if="value.showDefault"
                            :key="index"
                            :id="value.key">
                            {{ value.value }}
                        </th>
                        <th id="table-controls"></th>
                    </tr>
                </thead>
                <tbody>
                    <dataTableRow v-for="item in filter(data.data)" 
                        :key="item.id" 
                        :item="item"
                        :dataProperties="dataProperties"
                        @edit="editRow(item)"
                        @delete="deleteRow(item.id)" />
                </tbody>
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
            filterProperty: '',
            filterText: ''
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
        editRow: function(item) {
            console.log("Ready to edit row");
            console.log(item);
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