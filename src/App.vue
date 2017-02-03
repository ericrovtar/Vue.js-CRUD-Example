<template>
  <div id="app">
    <dataTable v-if="view === 'table'"
      :dataProperties="dataProperties"
      v-on:changeView="changeView" />

    <dataEdit v-if="view === 'add' || view === 'edit'" 
      :item="selectedItem" 
      :dataProperties="dataProperties"
      v-on:changeView="changeView" />
  </div>
</template>

<script>
import DataTable from './components/DataTable/DataTable'
import DataEdit from './components/DataEdit';

export default {
  name: 'app',
  components: {
    DataTable,
    DataEdit
  }, 
  data () {
    return {
      view: 'table',
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
      selectedItem: '',
    }
  },
  methods: {
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
  }
}
</script>

<style>
@import url('./styles/styles.css');
</style>
