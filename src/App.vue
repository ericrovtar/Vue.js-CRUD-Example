/***************
 * The main application component
 **/
<template>
  <div id="app">
    <div class="content-wrapper">
        <div class="[ flex wrap justify-content--flex-start ] [ add-bottom-margin ]">
            <div class="[ mobile--one-whole ] [ add-right-margin ]">
                <img src="./assets/acs-logo.png" />
            </div>

            <div class="[ mobile--one-whole ] [ text--bigger bold ]" style="padding-top: 6px">
                Front End Code Challenge &ndash; Eric Rovtar
            </div>
        </div>

        <p>
            Description goes here
        </p>
    </div>

    <div class="content-wrapper">
        <confirmation
            :confirmation="confirmation" />

        <dataTable v-if="view === 'table'"
            :data="data"
            :dataProperties="dataProperties"
            @changeView="changeView"
            @save="save"
            @confirmation="showConfirmation" />

        <dataEdit v-if="view === 'add' || view === 'edit'" 
            :item="selectedItem" 
            :dataProperties="dataProperties"
            @changeView="changeView"
            @save="save"
            @confirmation="showConfirmation" />

        <dataView v-if="view === 'view'"
            :item="selectedItem"
            @changeView="changeView" />
    </div>
  </div>
</template>

<script>
import _string from './includes/string.js';

import axios from 'axios';
import Confirmation from './components/_Common/Confirmation';
import DataTable from './components/DataTable/DataTable';
import DataEdit from './components/DataEdit/DataEdit';
import DataView from './components/DataView/DataView';

export default {
  name: 'app',
  components: {
    Confirmation,
    DataTable,
    DataEdit,
    DataView
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
              pattern: '',
              postBack: true,
              editable: true,
              showDefault: true
          },
          work_phone: {
              value: 'Work Phone',
              required: false,
              pattern: '',
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
              pattern: '',
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
    updateConfirmation: function(status, message) {
        this.confirmation = {
            status: status,
            message: message
        };
    },
    changeView: function(args) {
        //Set selected item
        if (args.item !== undefined) {
            //Use existing item
            this.selectedItem = args.item;
        }
        else {
            //Create an empty item
            this.selectedItem = this.newItem();
        }

        //Change view
        this.view = args.view;

        //Scroll to top
        this.$ScrollToTop;
    },
    showConfirmation: function(args) {
        this.confirmation = args;
    },
    save: function(args) {
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

        return item;
    },
  }
}
</script>

<style>
@import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('./styles/styles.css');
</style>
