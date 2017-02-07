<template>
    <span class="cursor--pointer" @click="toggleCheck">
        <i class="fa" style="width: 1em;" :class="classes"></i>
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: 'checkbox',
    props:  {
        value: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return { 
        }
    },
    computed: {
        classes: function () {
            if (this.value === true) {
                return "fa-check-square-o";
            }
            else {
                return "fa-square-o";
            }
        }
    },
    methods: {
        toggleCheck() {
            this.$emit('input', !this.value);
            this.$emit('click');
        }
    }

}
</script>

<style scoped></style>