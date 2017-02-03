<template>
    <div>
        <select v-model="filterProperty">
            <option v-for="(value, key, index) in dataProperties" 
                :key="index" 
                :value="value.key">
                {{ value.value }}
            </option>
        </select>
        <input v-model="filterText" />
        {{filterText}}
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Phone</th>
                <th>Work Phone</th>
                <th>Email</th>
                <th>URL</th>
                <th>Created At</th>
                <th>Updated Ad</th>
                </tr>
            </thead>
            <tbody>
                <dataTableRow v-for="item in filter(data.data)" 
                    :key="item.id" 
                    :item="item" />
            </tbody>
        </table>
    </div>
</template>

<script>
import DataTableRow from './DataTableRow';
import _string from '../../includes/string.js';

export default {
    name: 'dataTable',
    components: {
        DataTableRow
    },
    mounted () {
        //Get Table Data
        let url = 'https://challenge.acstechnologies.com/api/contact/';
        var request = new Request(url, {
                        method: 'get',
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

                //Load property values
                if (data.data.length > 0) {
                    _this.loadProperties(data.data[0]);
                }
                
            }).catch(function(error) {
                console.log('Request failed', error);
            });
        
        
        
        // console.log(this.data);
    },
    data () {
        return {
            data: '',
            dataProperties: [],
            filterProperty: '',
            filterText: ''
        }
    },
    methods: {
        loadProperties: function(sampleItem) {
            for (let prop in sampleItem) {
                this.dataProperties.push({
                    value: this.formatKey(prop),
                    key: prop
                })
            };
        },
        formatKey: function(key) {
            return key.replace('_', ' ').capitalizeFirstLetter();
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
        }
    }
}
</script>

<style scoped>
</style>