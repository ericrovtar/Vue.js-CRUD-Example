//state: disabled, active, enabled
//emit: 
//color: 
/***************
 * Displays a the data from an item.
 *
 * state: the item that will be displayed [ disabled, active, enabled ]
 *
 * emit: the function to emit back to the parent (default = click) 
 *
 * color: the color of the CTA
 *
 * class: additional classes to apply to the CTA
 *
 * $emits: {see emit property}
 **/
<template>
    <a class="[ cta ] [ white-space--nowrap ]"
        :class="classes"
        @click="click">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'cta',
    props: {
        state: {
            type: String,
            default: ''
        },
        emit: {
            type: String,
            default: 'click'
        },
        color: {
            type: String,
            default: ''
        },
        class: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        classes: function() {
            return `${this.state} ${this.color} ${this.class}`;
        }
    },
    methods: {
        click: function() {
            if (this.state === 'disabled') {
                return;
            }
            else {
                return this.$emit(this.emit);
            }
        }
    }
}
</script>

<style scoped></style>