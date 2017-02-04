<template>
    <div class="content-wrapper lock-width center-by-margin">
        <h1 v-if="item.id === ''">Add Record</h1>
        <h1 v-else>Edit Record</h1>

        <form>
            <div v-for="(value, key, index) in item" class="add-bottom-margin">
                <div class="bold">{{ dataProperties[key].value }}</div>

                <div>
                    <input type="text"
                        v-model="updatedItem[key]"
                        :disabled="!dataProperties[key].editable"
                        :required="dataProperties[key].required" />
                </div>

                <div>
                    {{ dataProperties[key] }}
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

export default {
    name: 'dataEdit',
    props: [ 'item', 'dataProperties' ],
    data () {
        return {
            updatedItem: JSON.parse(JSON.stringify(this.item))
        }
    },
    methods: {
        save: function() {
            //Create item with properties needed for post/put
            let postItem = this.createPostItem(this.updatedItem);
            console.log(postItem);

            //Check for new item
            if (this.item.id === '') {
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
            this.$emit('save', this.item);
            this.$emit('changeView', { view: 'table' });
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
            })
            .catch(function (error) {
                console.log('Request failed: ', error);
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
            })
            .catch(function (error) {
                console.log('Request failed: ', error);
            });
        }
    }
}
</script>

<style scoped></style>