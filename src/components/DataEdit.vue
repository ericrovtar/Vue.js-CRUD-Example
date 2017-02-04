<template>
    <div class="content-wrapper lock-width center-by-margin">
        <h1 v-if="item.id === ''">Add Record</h1>
        <h1 v-else>Edit Record</h1>

        <form>
            <div v-for="(value, key, index) in item" class="add-bottom-margin">
                <div class="bold">{{ dataProperties[key].value }}</div>

                <div>
                    <input type="text"
                        :value="item[key]"
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
export default {
    name: 'dataEdit',
    props: [ 'item', 'dataProperties' ],
    data () {
        return {
        }
    },
    methods: {
        save: function() {
            //Check for new item
            if (this.item.id === '') {
                console.log("Adding new item...");

                //Create item for postback
                let postItem = this.createPostItem(this.item);

                //this.addToDatabase(postItem);

                //Trigger parent update
                this.$emit('save', this.item);
            }
            else {
                console.log("Updating existing item...");
                //Update existing item

                //Trigger parent update
                this.$emit('save', this.item);
            }

        },
        cancel: function() {
            console.log("canceled");
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
            let url = 'https://challenge.acstechnologies.com/api/contact';
            let data = JSON.stringify(item);

            var request = new Request(url, {
                            method: 'post',
                            mode: 'no-cors',
                            redirect: 'follow',
                            headers: {
                                'X-Auth-Token': 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg'
                            }, 
                            body: data
                        });

            //Allow access to `this` within fetch
            let _this = this;

            //Get the data
            fetch(request)
                .then(function json(response) {  
                    // return response.json()  
                    // console.log('Success!', response);
                    return response.json() 
                })
                .then(function(data) {
                    console.log('Request succeeded with JSON response', data);
                    
                }).catch(function(error) {
                    console.log('Request failed', error);
                });
        }
    }
}
</script>

<style scoped></style>