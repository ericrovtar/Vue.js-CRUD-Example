<template>
    <div>
        <div class="add-bottom-margin">
            <h1 class="no-bottom-margin">{{item.first_name}} {{item.last_name}}</h1>
            <div class="flex justify-content--flex-start">
                <div v-if="!item.company_name.isNullOrWhitespace()"
                     class="add-right-margin">
                    {{item.company_name}}
                </div>

                <div v-if="!item.email.isNullOrWhitespace()"                
                     class="add-right-margin">
                    <a :href="'mailto:' + item.email"><i class="fa fa-envelope-o"></i></a>
                </div>
                <div v-if="!item.url.isNullOrWhitespace()">
                    <a :href="item.url"><i class="fa fa-external-link"></i></a>
                </div>
            </div>
        </div>

        <div v-if="!item.address.isNullOrWhitespace()"
             class="add-bottom-margin">
            <div class="bold">Address</div>
            <div>
                {{item.address}}<br />
                {{item.city}}, {{item.state}} {{item.zip}}
            </div>
        </div>

        <div class="add-bottom-margin">
            <div class="bold ">Phone Numbers</div>
            <div>
                Primary: {{item.phone}}<br />
                Work: {{item.work_phone}}
            </div>
        </div>

        <div class="text--smaller italic add-bottom-margin"
            v-if="!String.isNullOrWhitespace(item.id)">
            <div v-if="!item.created_at.isNullOrWhitespace()">
                Created: {{ item.created_at }}<br />
            </div>
            <div v-if="!item.updated_at.isNullOrWhitespace()">
                Last Modified: {{ item.updated_at }}
            </div>
        </div>

        <CTA
            @click="close">
            Close
        </CTA>
    </div>
</template>

<script>
import CTA from '../_Common/CTA';

export default {
    name: 'dataView',
    props: [ 'item' ],
    components: {
        CTA
    },
    data () {
        return {

        }
    },
    methods: {
        close: function() {
            this.$emit('changeView', { view: 'table' });
        }
    }
}
</script>

<style scoped></style>