<template>
<div>
    <div class="add-bottom-margin">
        <div class="bold">
            What Columns Do You Want to See?
        </div>
        <div v-for="(value, key, index) in dataProperties">
            <input type="checkbox"
                v-model="dataProperties[key].showDefault"
                :value="key">
                {{ value.value }}
            </input>
        </div>
    </div>
    <div>
        <a class="cta"
            @click="ok">OK</a>
        <a class="cta" 
            @click="cancel">Cancel</a> 
    </div>
</template>

<script>
export default {
    name: 'columnSelect',
    props: [ 'dataProperties' ],
    methods: {
        ok: function() {
            this.$emit('changeView', { view: 'table' });
        },
        cancel: function() {

        }
    }
}
</script>

<style scoped></style>