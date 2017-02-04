<template>
    <div class="content-wrapper lock-width center-by-margin">
        <h1 v-if="item.id === '' || item.id === null">Add Record</h1>
        <h1 v-else>Edit Record</h1>

        <confirmation
            :confirmation="confirmation" />

        <form :id="updateForm">
            <div v-for="(value, key, index) in item" class="add-bottom-margin">
                <div v-if="dataProperties[key].editable">
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
    methods: {
        checkFormValidity: function() {
            var form = document.getElementById(this.updateForm);

            return form.checkValidity();
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

                //Check for new item
                if (this.item.id === '' || this.item.id === null) {
                    console.log("Adding new item...");

                    //Add the item to the database
                    this.addToDatabase(postItem);
                }
                else {
                    console.log("Updating existing item...");

                    //Update existing item
                    this.updateInDatabase(this.item.id, postItem);
                }

                //Trigger parent update
                this.$emit('save');
                this.$emit('changeView', { view: 'table' });
            }
            else {
                //Show Error Message
                this.updateConfirmation('error', "Something isn't quite right. Please check for errors.");

                //Scroll to top
                this.$ScrollToTop;
            }
        },
        cancel: function() {
            console.log("canceled");

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

            //Allow access to `this` within post
            let _this = this;

            axios.post(url, item, {
                headers: headers
            })
            .then(function (response) {
                console.log(response);
                _this.$emit('confirmation', {
                    status: 'success',
                    message: 'Added to db'
                });
                // return response;
            })
            .catch(function (error) {
                console.log('Request failed: ', error);
                // return error;
            });
        },
        updateInDatabase(id, item) {
            //Update database data
            let url = `https://challenge.acstechnologies.com/api/contact/${id}`;
            let headers = { 'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg' };

            //Allow access to `this` within put
            let _this = this;

            axios.put(url, item, {
                headers: headers
            })
            .then(function (response) {
                console.log(response);

                _this.$emit('confirmation', {
                    status: 'success',
                    message: 'Update in db'
                });
                // return response;
            })
            .catch(function (error) {
                console.log('Request failed: ', error);
                return error;
            });
        },
        createConfirmation(status, message) {
            return {
                status: status,
                message: message
            }
        }
    }
}
</script>

<style scoped></style>