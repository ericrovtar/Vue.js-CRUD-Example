<template>
  <div id="app">
    <div class="content-wrapper">
      <confirmation
        v-if="confirmation.status !== ''"
        :confirmation="confirmation" />

      <dataTable v-if="view === 'table'"
        :data="data"
        :dataProperties="dataProperties"
        @changeView="changeView"
        @save="save" />

      <dataEdit v-if="view === 'add' || view === 'edit'" 
        :item="selectedItem" 
        :dataProperties="dataProperties"
        @changeView="changeView"
        @save="save"
        @confirmation="showConfirmation" />
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
              pattern: '',
              postBack: false,
              editable: false,
              showDefault: false
          },
          first_name: {
              value: 'First Name',
              required: true,
              pattern: '',
              postBack: true,
              editable: true,
              showDefault: true
          },
          last_name: {
              value: 'Last Name',
              required: false,
              pattern: '',
              postBack: true,
              editable: true,
              showDefault: true
          },
          company_name: {
              value: 'Company Name',
              required: false,
              pattern: '',
              postBack: true,
              editable: true,
              showDefault: true
          },
          address: {
              value: 'Address',
              required: false,
              pattern: '',
              postBack: true,
              editable: true,
              showDefault: false
          },
          city: {
              value: 'City',
              required: false,
              pattern: '',
              postBack: true,
              editable: true,
              showDefault: false
          },
          state: {
              value: 'State',
              required: false,
              pattern: '',
              postBack: true,
              editable: true,
              showDefault: false
          },
          zip: {
              value: 'Zip Code',
              required: false,
              pattern: '^([0-9]{5})$',
              postBack: true,
              editable: true,
              showDefault: false
          },
          phone: {
              value: 'Phone',
              required: false,
              pattern: '^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$',
              postBack: true,
              editable: true,
              showDefault: true
          },
          work_phone: {
              value: 'Work Phone',
              required: false,
              pattern: '^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$',
              postBack: true,
              editable: true,
              showDefault: false
          },
          email: {
              value: 'Email',
              required: false,
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$',
              postBack: true,
              editable: true,
              showDefault: true
          },
          url: {
              value: 'URL',
              required: false,
              pattern: 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)',
              postBack: true,
              editable: true,
              showDefault: false
          },
          created_at: {
              value: 'Created At',
              required: true,
              pattern: '',
              postBack: false,
              editable: false,
              showDefault: false
          },
          updated_at: {
              value: 'Updated At',
              required: true,
              pattern: '',
              postBack: false,
              editable: false,
              showDefault: false
          },
      },
      selectedItem: '',
      confirmation: {
        status: '',
        message: ''
      }
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
        this.selectedItem = args.item;
      }
      else {
        this.selectedItem = this.newItem();
      }

      this.view = args.view;
    },
    showConfirmation: function(args) {
      console.log("Show confirmation...");
      this.confirmation = args;
      console.log(args);
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
