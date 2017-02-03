<template>
    <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.first_name }}</td>
        <td>{{ item.last_name }}</td>
        <td>{{ item.company_name }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.state }}</td>
        <td>{{ item.zip }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.work_phone }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.url }}</td>
        <td>{{ item.created_at }}</td>
        <td>{{ item.updated_at }}</td>
    </tr>
</template>

<script>
export default {
    name: 'dataTableRow',
    props: ['item']
}
</script>

<style scoped>
</style>