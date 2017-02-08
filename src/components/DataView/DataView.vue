/***************
 * Displays a the data from an item.
 *
 * item: the item that will be displayed;
 **/
 <template>
    <div>
        <div class="add-bottom-margin">
            <h1 class="no-bottom-margin">{{item.first_name}} {{item.last_name}}</h1>
            <div class="flex justify-content--flex-start">
                <div v-if="!String.isNullOrWhitespace(item.company_name)"
                     class="add-right-margin">
                    {{item.company_name}}
                </div>

                <div v-if="!String.isNullOrWhitespace(item.email)"                
                     class="add-right-margin">
                    <a :href="`mailto:${item.email}`"><i class="fa fa-envelope-o"></i></a>
                </div>
                <div v-if="!String.isNullOrWhitespace(item.url)">
                    <a :href="item.url"><i class="fa fa-external-link"></i></a>
                </div>
            </div>
        </div>

        <div v-if="!String.isNullOrWhitespace(item.address) || !String.isNullOrWhitespace(item.city) || !String.isNullOrWhitespace(item.state) || !String.isNullOrWhitespace(item.zip)"
             class="add-bottom-margin">
            <div class="bold">Address</div>
            <div>
                {{item.address}}<br />
                {{item.city}}, {{item.state}} {{item.zip}}
            </div>
        </div>

        <div v-if="!String.isNullOrWhitespace(item.phone) || !String.isNullOrWhitespace(item.work_phone)"
             class="add-bottom-margin">
            <div class="bold">
                Phone Number<span v-if="!String.isNullOrWhitespace(item.phone) && !String.isNullOrWhitespace(item.work_phone)">s</span>
            </div>
            <div>
                Primary: {{item.phone}}<br />
                Work: {{item.work_phone}}
            </div>
        </div>

        <div class="text--smaller italic add-bottom-margin"
            v-if="item.id !== null">
            <div v-if="!String.isNullOrWhitespace(item.created_at)">
                Created: {{ item.created_at }}<br />
            </div>
            <div v-if="!String.isNullOrWhitespace(item.updated_at)">
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
import { mapGetters, mapMutations, mapActions } from 'vuex'

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
        ...mapMutations([
            'changeView',
        ]),
        close: function() {
            this.changeView({ view: 'table' });
            // this.$emit('changeView', { view: 'table' });
        }
    },
}
</script>

<style scoped></style>