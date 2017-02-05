/***************
 * Displays a form to adding a data entry or editing an existing entry.
 *
 * item:           the item that will be edited; when adding a new item
 *                 pass in an empty item
 *
 * dataProperties: an array of properties related to each database entry,
 *                 including required fields and required patterns
 *
 * $emits: confirmation, save, changeView
 **/

<template>
    <div class="lock-width center-by-margin">
        <h1 v-if="item.id === '' || item.id === null">Add Record</h1>
        <h1 v-else>Edit Record</h1>

        <confirmation
            :confirmation="confirmation" />

        <form :id="updateForm">
            <div v-for="(value, key, index) in item">
                <div v-if="dataProperties[key].editable" class="add-bottom-margin">
                    <div class="bold">{{ dataProperties[key].value }}</div>

                    <div>
                        <input type="text"
                            v-model="updatedItem[key]"
                            :disabled="!dataProperties[key].editable"
                            :required="dataProperties[key].required"
                            :pattern="dataProperties[key].pattern === '' ? '.*' : dataProperties[key].pattern" />
                    </div>
                </div>
            </div>

            <div class="text--smaller italic add-bottom-margin"
                v-if="item.id !== '' && item.id !== null">
                <div v-if="item.created_at !== '' && item.created_at !== null">
                    Created: {{ item.created_at }}<br />
                </div>
                <div v-if="item.updated_at !== '' && item.updated_at !== null">
                    Last Modified: {{ item.updated_at }}
                </div>
            </div>

            <a class="cta"
                @click="save">Save</a>
            <a class="cta" 
                @click="cancel">Cancel</a> 
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Confirmation from '../components/Confirmation';

export default {
    name: 'dataEdit',
    props: [ 'item', 'dataProperties' ],
    components: {
        Confirmation
    }, 
    data () {
        return {
            updatedItem: JSON.parse(JSON.stringify(this.item)),
            updateForm: 'updateForm',
            confirmation: {
                status: '',
                message: ''
            }
        }
    },
    mounted () {
        //Clear parent confirmation message
        this.updateParentConfirmation(null, null);
    },
    methods: {
        checkFormValidity: function() {
            var form = document.getElementById(this.updateForm);

            return form.checkValidity();
        },
        updateParentConfirmation: function(status, message) {
            this.$emit('confirmation', {
                status: status,
                message: message
            });
        },
        updateConfirmation: function(status, message) {
            this.confirmation = {
                status: status,
                message: message
            };
        },
        save: function() {
            //Check form validity
            if (this.checkFormValidity() === true) {
                //Create item with properties needed for post/put
                let postItem = this.createPostItem(this.updatedItem);

                //Setup `promise`
                let promise = null;

                let method = null;

                //Check for new item
                if (this.item.id === '' || this.item.id === null) {
                    //Add the item to the database
                    promise = this.addToDatabase(postItem);

                    method = 'added';
                }
                else {
                    //Update existing item
                    promise = this.updateInDatabase(this.item.id, postItem);

                    method = 'updated';
                }

                //Make `this` available in promise
                let _this = this;
                
                //Handle promise
                promise.then(function (response) {
                    _this.updateParentConfirmation(
                        'success',
                        `Success! ${postItem.first_name} ${postItem.last_name} was ${method}.`
                    );

                    //Trigger data reload
                    _this.$emit('save');
                    
                    //Change view back to table
                    _this.$emit('changeView', { view: 'table' });
                })
                .catch(function (error) {
                    console.log('Request failed: ', error);

                    //Show error message
                    _this.updateConfirmation(
                        'error',
                        `Oops! Something didn't go as expected. Please try again.`
                    );

                    _this.$ScrollToTop;
                });
            }
            else {
                //Show Error Message
                this.updateConfirmation(
                    'error', 
                    `Something isn't quite right. Please check for errors.`
                );

                //Scroll to top
                this.$ScrollToTop;
            }
        },
        cancel: function() {
            //Let parent know we're done
            this.$emit('changeView', { view: 'table' });
        },
        createPostItem: function(item) {
            let postItem = {};

            for (let prop in item) {
                //Check if we're to postback this prop
                if (this.dataProperties[prop].postBack === true) {
                    postItem[prop] = item[prop];
                }
            }

            return postItem;
        },
        addToDatabase: function(item) {
            //Post New Data
            let url = 'https://challenge.acstechnologies.com/api/contact/';
            let headers = { 'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg' };

            let promise = axios.post(url, item, {
                headers: headers
            });

            return promise;
        },
        updateInDatabase(id, item) {
            //Update database data
            let url = `https://challenge.acstechnologies.com/api/contact/${id}`;
            let headers = { 'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg' };

            let promise = axios.put(url, item, {
                headers: headers
            });

            return promise;
        },
        // createConfirmation(status, message) {
        //     return {
        //         status: status,
        //         message: message
        //     }
        // }
    }
}
</script>

<style scoped></style>