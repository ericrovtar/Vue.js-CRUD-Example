<template>
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
        <dataTableRow v-for="item in data.data" :key="item.id" :item="item" />
      </tbody>
    </table>
</template>

<script>
import DataTableRow from './DataTableRow';

export default {
    name: 'dataTable',
    components: {
        DataTableRow
    },
    mounted () {
        let url = 'https://challenge.acstechnologies.com/api/contact/';
        var request = new Request(url, {
                        method: 'get',
                        headers: {
                        'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg'
                        }, 
                    });

        //Allow access to `this` within fetch
        let _this = this;
        fetch(request)
            .then(function json(response) {  
                // return response.json()  
                console.log('Success!', response);
                return response.json() 
            })
            .then(function(data) {
                // console.log('Request succeeded with JSON response', data);
                //Update data
                _this.data = data;
            }).catch(function(error) {
                console.log('Request failed', error);
            });
        
        console.log(this.data);
    },
    data () {
        return {
            data: ''
        }
    }
}
</script>

<style scoped>
</style>