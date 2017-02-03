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
        <tr v-for="item in data.data" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.company_name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.zip }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.work_phone }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.created_at }}</td>
          <td>{{ item.updated_at }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    name: 'dataTable',
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