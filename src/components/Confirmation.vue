<template>
    <div class="add-bottom-margin add-padding" :class="confirmation.status === 'error' ? 'box--red' : 'box--green'">
        {{ confirmation.message }}
    </div>
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