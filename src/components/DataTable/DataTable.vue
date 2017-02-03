<template>
    <div>
        <div class="add-bottom-margin">
            <h1>Filter</h1>

            <select v-model="filterProperty">
                <option v-for="(value, key, index) in dataProperties" 
                    :key="index" 
                    :value="value.key">
                    {{ value.value }}
                </option>
            </select>
            <input v-model="filterText" />
        </div>

        <div class="add-bottom-margin">
            <h1>Data</h1>

            <table>
                <thead>
                    <tr>
                        <th v-for="(value, key, index) in dataProperties"
                            :key="index"
                            :id="value.key">
                            {{ value.value }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <dataTableRow v-for="item in filter(data.data)" 
                        :key="item.id" 
                        :item="item"
                        v-on:edit="editRow(item)" />
                </tbody>
            </table>
        </div>

        <div>
            <h1>Add Data</h1>

            <dataTableRowAdd :item="newItem()" :dataProperties="dataProperties" />
        </div>
    </div>
</template>

<script>
import _string from '../../includes/string.js';

import DataTableRow from './DataTableRow';
import DataTableRowAdd from './DataTableRowAdd';

export default {
    name: 'dataTable',
    components: {
        DataTableRow,
        DataTableRowAdd
    },
    mounted () {
        //Get Table Data
        let url = 'https://challenge.acstechnologies.com/api/contact/';
        var request = new Request(url, {
                        method: 'get',
                        mode: 'cors',
                        redirect: 'follow',
                        headers: {
                            'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg'
                        }, 
                    });

        //Allow access to `this` within fetch
        let _this = this;

        //Get the data
        fetch(request)
            .then(function json(response) {  
                // return response.json()  
                // console.log('Success!', response);
                return response.json() 
            })
            .then(function(data) {
                // console.log('Request succeeded with JSON response', data);
                //Update data
                _this.data = data;

                // //Load property values
                // if (data.data.length > 0) {
                //     _this.loadProperties(data.data[0]);

                //     // console.log(_this.dataProperties);
                // }
                
            }).catch(function(error) {
                console.log('Request failed', error);
            });
    },
    data () {
        return {
            data: '',
            dataProperties: {
                id: {
                    value: 'ID',
                    required: true,
                    postBack: false,
                    editable: false
                },
                first_name: {
                    value: 'First Name',
                    required: true,
                    postBack: true,
                    editable: true
                },
                last_name: {
                    value: 'Last Name',
                    required: false,
                    postBack: true,
                    editable: true
                },
                company_name: {
                    value: 'Company Name',
                    required: false,
                    postBack: true,
                    editable: true
                },
                address: {
                    value: 'Address',
                    required: false,
                    postBack: true,
                    editable: true
                },
                city: {
                    value: 'City',
                    required: false,
                    postBack: true,
                    editable: true
                },
                state: {
                    value: 'State',
                    required: false,
                    postBack: true,
                    editable: true
                },
                zip: {
                    value: 'Zip Code',
                    required: false,
                    postBack: true,
                    editable: true
                },
                phone: {
                    value: 'Phone',
                    required: false,
                    postBack: true,
                    editable: true
                },
                work_phone: {
                    value: 'Work Phone',
                    required: false,
                    postBack: true,
                    editable: true
                },
                email: {
                    value: 'Email',
                    required: false,
                    postBack: true,
                    editable: true
                },
                url: {
                    value: 'URL',
                    required: false,
                    postBack: true,
                    editable: true
                },
                created_at: {
                    value: 'Created At',
                    required: true,
                    postBack: false,
                    editable: false
                },
                updated_at: {
                    value: 'Updated At',
                    required: true,
                    postBack: false,
                    editable: false
                },
            },
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
        newItem: function() {
            //Create an empty object
            let item = {};

            //Add properties to the item
            for (let prop in this.dataProperties) {
                item[prop] = '';
            }
            // this.dataProperties.forEach(function (item2) {
            //     item[item2.key] = '';
            // });

            return item;
        },
        editRow: function(item) {
            console.log("Ready to edit row");
            console.log(item);
        }
    }
}
</script>

<style scoped>
</style>