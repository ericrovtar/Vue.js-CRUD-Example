<template>
  <div id="app">
    <div class="content-wrapper">
      <confirmation
        :status="'success'"
        :message="'Congrats!'" />

      <dataTable v-if="view === 'table'"
        :data="data"
        :dataProperties="dataProperties"
        @changeView="changeView"
        @save="save" />

      <dataEdit v-if="view === 'add' || view === 'edit'" 
        :item="selectedItem" 
        :dataProperties="dataProperties"
        @changeView="changeView"
        @save="save" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Confirmation from './components/Confirmation';
import DataTable from './components/DataTable/DataTable';
import DataEdit from './components/DataEdit';

export default {
  name: 'app',
  components: {
    Confirmation,
    DataTable,
    DataEdit
  }, 
  data () {
    return {
      view: 'table',
      data: '',
      dataProperties: {
          id: {
              value: 'ID',
              required: true,
              postBack: false,
              editable: false,
              showDefault: false
          },
          first_name: {
              value: 'First Name',
              required: true,
              postBack: true,
              editable: true,
              showDefault: true
          },
          last_name: {
              value: 'Last Name',
              required: false,
              postBack: true,
              editable: true,
              showDefault: true
          },
          company_name: {
              value: 'Company Name',
              required: false,
              postBack: true,
              editable: true,
              showDefault: true
          },
          address: {
              value: 'Address',
              required: false,
              postBack: true,
              editable: true,
              showDefault: false
          },
          city: {
              value: 'City',
              required: false,
              postBack: true,
              editable: true,
              showDefault: false
          },
          state: {
              value: 'State',
              required: false,
              postBack: true,
              editable: true,
              showDefault: false
          },
          zip: {
              value: 'Zip Code',
              required: false,
              postBack: true,
              editable: true,
              showDefault: false
          },
          phone: {
              value: 'Phone',
              required: false,
              postBack: true,
              editable: true,
              showDefault: true
          },
          work_phone: {
              value: 'Work Phone',
              required: false,
              postBack: true,
              editable: true,
              showDefault: false
          },
          email: {
              value: 'Email',
              required: false,
              postBack: true,
              editable: true,
              showDefault: true
          },
          url: {
              value: 'URL',
              required: false,
              postBack: true,
              editable: true,
              showDefault: false
          },
          created_at: {
              value: 'Created At',
              required: true,
              postBack: false,
              editable: false,
              showDefault: false
          },
          updated_at: {
              value: 'Updated At',
              required: true,
              postBack: false,
              editable: false,
              showDefault: false
          },
      },
      selectedItem: '',
    }
  },
  beforeMount () {
      //Get Table Data
      this.loadData();
  },
  methods: {
    loadData: function() {
      // let url = 'https://challenge.acstechnologies.com/api/contact/';
      // var request = new Request(url, {
      //                 method: 'get',
      //                 mode: 'cors',
      //                 redirect: 'follow',
      //                 headers: {
      //                     'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg'
      //                 }, 
      //             });

      // //Allow access to `this` within fetch
      // let _this = this;

      // //Get the data
      // fetch(request)
      //     .then(function json(response) {  
      //         return response.json() 
      //     })
      //     .then(function(data) {
      //         //Update data
      //         _this.data = data;
      //     }).catch(function(error) {
      //         console.log('Request failed', error);
      //     });

      let url = 'https://challenge.acstechnologies.com/api/contact/';
      let headers = { 'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg' };

      //Allow access to `this` within fetch
      let _this = this;

      axios.get(url, {
          headers: headers
      })
      .then(function (response) {
          // console.log(response);
          _this.data = response.data;
      })
      .catch(function (error) {
          console.log('Request failed: ', error);
      });
    },
    changeView: function(args) {
      if (args.item !== undefined) {
        console.log("Selected item is...");
        console.log(args.item);

        this.selectedItem = args.item;
      }
      else {
        this.selectedItem = this.newItem();
      }

      this.view = args.view;
      console.log("View changed to " + args.view);
    },
    save: function(args) {
      console.log("Saving...");

      //Reload Data
      this.loadData();
    },
    newItem: function() {
      //Create an empty object
      let item = {};

      //Add properties to the item
      for (let prop in this.dataProperties) {
          item[prop] = null;
      }
      // this.dataProperties.forEach(function (item2) {
      //     item[item2.key] = '';
      // });

      return item;
    },
  }
}
</script>

<style>
@import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('./styles/styles.css');
</style>
