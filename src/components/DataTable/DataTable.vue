<template>
    <div>
        <div class="box--dark-gray add-bottom-margin">
            <div class="content-wrapper lock-width">      
                <h1>Display Options</h1>

                <div class="add-bottom-margin">
                    <div class="bold">
                        Filter
                    </div>

                    <div>
                        Column to filter by:
                        <select v-model="filterProperty">
                            <option v-for="(value, key, index) in dataProperties" 
                                :key="index" 
                                :value="key">
                                {{ value.value }}
                            </option>
                        </select>
                    </div>

                    <div>
                        Search string:
                        <input v-model="filterText" />
                    </div>
                </div>

                <div>
                    <div class="bold">
                        Columns to Display
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

        <div class="add-bottom-margin">
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
                        @edit="editRow(item)" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import DataTableRow from './DataTableRow';

export default {
    name: 'dataTable',
    props: [ 'dataProperties' ],
    components: {
        DataTableRow
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
        }
    }
}
</script>

<style scoped>
</style>