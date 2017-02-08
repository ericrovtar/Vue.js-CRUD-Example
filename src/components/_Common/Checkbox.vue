/***************
 * Displays a custom checkbox using FontAwesome
 *
 * checked: a truthy value representing if the box is checked or not
 *
 * emits: input, click, change
 **/
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
        checked: {
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
            if (this.checked === true) {
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
            this.$emit('change');
        }
    }

}
</script>

<style scoped></style>