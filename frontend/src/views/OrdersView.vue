<template>
    <div class="orders-view">
        <h1>Заказы</h1>

        <OrderTable />
    </div>
</template>

<script>
    import OrderTable from '@/components/OrderTable.vue';

    export default {
        name: 'OrdersView',
        components: {
            OrderTable
        },
    };
</script>

<style>
    .orders-view{
        margin: 20px;
    }
</style>
