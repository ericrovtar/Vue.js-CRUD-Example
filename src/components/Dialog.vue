<template>
    <transition name="fade">
        <div class="modal flex"
            v-if="isDialogVisible">
            <div class="modal__content one-half center-by-margin content-wrapper center">
                <div class="add-bottom-margin">
                    <slot>{{ message }}</slot>
                </div>

                <a v-for="(value, key, index) in options"
                    class="cta"
                    :class="value.class"
                    :key="index"
                    @click="$emit(value.emit)">
                    <i v-if="value.icon !== null && value.icon !== ''"
                        class="fa"
                        :class="value.icon"></i>
                    {{ value.text }}
                </a>

                <a v-if="showCancel"
                    class="cta"
                    @click="$emit('hideDialog')">
                    Cancel
                </a>
            </div>
        </div>
    </template>
</template>

<script>
export default {
    name: 'dialog',
    props: [ 'show', 'message', 'options', 'showCancel' ],
    data () {
        return {
            //isDialogVisible: false || this.show
        }
    },
    computed: {
        isDialogVisible: function() {
            return this.show;
        }
    },
    methods: {
        hideDialog: function() {
            isDialogVisible: false;
        }
    }

}
</script>

<style scoped></style>