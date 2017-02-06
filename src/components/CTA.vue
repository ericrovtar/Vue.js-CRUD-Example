//state: disabled, active, enabled
//emit: 
//color: 
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
    mounted() {
        console.log(this.class);
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