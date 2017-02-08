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

        <p class="lock-width">
            This simple application implements CRUD (create, read, update, delete) functionality
            over a test database provided by ACS using the JavaScript framework Vue. It also adds
            some extra functionality, such as filter and display settings.
            
            {{ view }}
        </p>
    </div>

    <hr />

    <div class="content-wrapper">
        <confirmation
            :confirmation="confirmation" />

        <dataTable v-if="view === 'table'"
            @confirmation="showConfirmation" />

        <dataEdit v-if="view === 'add' || view === 'edit'" 
            :item="selectedItem" 
            @confirmation="showConfirmation" />

        <dataView v-if="view === 'view'"
            :item="selectedItem" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

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
            confirmation: {
                status: '',
                message: ''
            }   
        }
    },
    beforeMount () {
        //Get Table Data
        this.loadData();
        console.log(this.data);
    },
    computed: {
        ...mapGetters([
            'view',
            'selectedItem',
            'data'
        ])
    },
    methods: {
        ...mapMutations([
            'changeView',
            'changeSelectedItem',
        ]),
        ...mapActions([
            'loadData'
        ]),
    updateConfirmation: function(status, message) {
        this.confirmation = {
            status: status,
            message: message
        };
    },
    showConfirmation: function(args) {
        this.confirmation = args;
    },
  }
}
</script>

<style>
@import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('./styles/styles.css');
</style>
