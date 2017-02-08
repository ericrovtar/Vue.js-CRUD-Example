/***************
 * Displays a form to adding a data entry or editing an existing entry.
 *
 * item: the item that will be edited; when adding a new item pass in
 *       an empty item
 *
 * $emits: confirmation
 **/
<template>
    <div class="lock-width center-by-margin">
        <h1 v-if="item.id === null">Add Record</h1>
        <h1 v-else>Edit Record</h1>

        <confirmation
            :confirmation="confirmation" />

        <form :id="updateForm"
              :class="updateFormClass">
            <div v-for="(value, key, index) in item">
                <div v-if="dataProperties[key].editable" class="add-bottom-margin">
                    <div class="bold">{{ dataProperties[key].value }}</div>

                    <div>
                        <input type="text"
                            v-model="updatedItem[key]"
                            :disabled="!dataProperties[key].editable"
                            :required="dataProperties[key].required"
                            :pattern="dataProperties[key].pattern === '' ? '.*' : dataProperties[key].pattern"
                            @change="calculateSaveState" />
                    </div>
                </div>
            </div>

            <div class="text--smaller italic add-bottom-margin"
                v-if="item.id !== null">
                <div v-if="!item.created_at.isNullOrWhitespace()">
                    Created: {{ item.created_at }}<br />
                </div>
                <div v-if="!item.updated_at.isNullOrWhitespace()">
                    Last Modified: {{ item.updated_at }}
                </div>
            </div>

            <CTA
                :state="saveState"
                :class="'add-right-margin'"
                @click="save">
                Save
            </CTA>
            <CTA
                @click="cancel">
                Cancel
            </CTA>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import * as api from '../../api';

import CTA from '../_Common/CTA';
import Confirmation from '../_Common/Confirmation';

export default {
    name: 'dataEdit',
    props: [ 
        'item', 
    ],
    components: {
        Confirmation,
        CTA
    }, 
    data () {
        return {
            updatedItem: JSON.parse(JSON.stringify(this.item)),
            updateForm: 'updateForm',
            updateFormClass: '',
            saveState: this.calculateSaveState(),
            confirmation: {
                status: '',
                message: ''
            }
        }
    },
    computed: {
        ...mapGetters([
            'dataProperties'
        ]),
        // saveState: function () {
        //     return this.calculateSaveState();
        // },
        filteredSortedData: function () {
            return this.sort(this.filter(this.data.data));
        }
    },
    mounted () {
        //Clear parent confirmation message
        this.updateParentConfirmation(null, null);
    },
    methods: {
        ...mapMutations([
            'changeView',
        ]),
        ...mapActions([
            'loadData'
        ]),
        calculateSaveState: function () {
            //Check that the form is valid and isn't submitting
            if ((this.checkFormValidity() === true)) {
                this.saveState = 'enabled';
            }
            else {
                this.saveState = 'disabled';
            }
        },
        checkFormValidity: function() {
            try {
                var form = document.getElementById(this.updateForm);

                return form.checkValidity();
            }
            catch (err) {
                return false;
            }
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
            //Add `submitted` class to the form
            this.updateFormClass = "submitted";

            //Check form validity
            if (this.checkFormValidity() === true) {
                //Set the form is submitting
                this.saveState = 'disabled';

                //Create item with properties needed for post/put
                let postItem = this.createPostItem(this.updatedItem);

                //Setup `promise`
                let promise = null;

                let method = null;

                //Check for new item
                if (String.isNullOrWhitespace(this.item.id)) {
                    //Add the item to the database
                    promise = api.addItem(postItem);

                    method = 'added';
                }
                else {
                    //Update existing item
                    promise = api.updateItem(this.item.id, postItem);

                    method = 'updated';
                }

                //Make `this` available in promise
                let _this = this;
                
                //Handle promise
                promise.then(function (response) {
                    //Calculate Save Button State
                    _this.calculateSaveState();

                    //Show Confirmation
                    _this.updateParentConfirmation(
                        'success',
                        `Success! ${postItem.first_name} ${postItem.last_name} was ${method}.`
                    );

                    //Trigger data reload
                    _this.loadData({
                        catch: function(error) {
                            _this.updateParentConfirmation(
                                'error',
                                `Oops! Something didn't go as expected. Please try again.`
                            );
                        }
                    });

                    //Change view back to table
                    _this.changeView({ view: 'table' });
                })
                .catch(function (error) {
                    //Calculate Save Button State
                    _this.calculateSaveState();
                    
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
            this.changeView({ view: 'table' });
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
    }
}
</script>

<style scoped></style>