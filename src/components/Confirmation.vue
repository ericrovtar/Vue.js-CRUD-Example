/***************
 * Displays a confirmation / error message
 *
 * confirmation: an object representing a confirmation
 *     status:  the status code of the message [ success | error ]
 *     message: the message to display to the user
 **/
<template>
    <transition name="fade">
        <div v-if="confirmation.status !== '' && confirmation.status !== null"
            class="add-bottom-margin add-padding" 
            :class="confirmation.status === 'error' ? 'box--red' : 'box--green'">
            {{ confirmation.message }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'confirmation',
    props: [ 'confirmation' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped></style>