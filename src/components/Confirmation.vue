<template>
    <div class="add-bottom-margin add-padding" :class="status === 'error' ? 'box--red' : 'box--green'">
        {{ message }} {{ status }}
    </div>
</template>

<script>
export default {
    name: 'confirmation',
    props: [ 'status', 'message' ],
    data () {

    }
}
</script>

<style scoped></style>