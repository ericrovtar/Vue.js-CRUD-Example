/***************
 * Displays a modal dialog with specified options, triggering
 * their relative emit statements
 *
 * show:       when true, the dialog will display
 *
 * message:    message to display in the dialog (overridden by
 *             any content used in the slot)
 *
 * options:    an array of items representing the user's choices
 *     class:  CSS class to apply to the CTA
 *     icon:   icon to display on the CTA
 *     text:   text value of the CTA
 *     emit:   value to emit back to parent when CTA is clicked
 *
 * showCancel: when true, a cancel button will be shown (the hideDialog event
 *             must be handled by the parent)
 *
 * $emits: { user-specified }, [ hideDialog ]
 **/
<template>
    <transition name="fade">
        <div class="modal flex"
            v-if="isDialogVisible">
            <div class="modal__content one-half center-by-margin content-wrapper center">
                <div class="add-bottom-margin">
                    <slot>{{ message }}</slot>
                </div>

                <div>
                    <CTA v-for="(value, key, index) in options"
                        :class="`${value.class} add-right-margin`"
                        :key="index"
                        @click="$emit(value.emit)">
                        <i v-if="!value.icon.isNullOrWhitespace()"
                            class="fa"
                            :class="value.icon"></i>
                        {{ value.text }}
                    </CTA>

                    <CTA v-if="showCancel"
                        @click="$emit('hideDialog')">
                        Cancel
                    </CTA>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import CTA from './CTA';

export default {
    name: 'dialog',
    components: {
        CTA
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: []
        },
        showCancel: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        isDialogVisible: function() {
            return this.show;
        }
    },
    data () {
        return {
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