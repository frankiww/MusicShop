<template>
  <table v-if="sales.length>0" class="order-table" >
    <thead>
      <tr>
        <th>Магазин</th>
        <th>Запись</th>
        <th>Количество</th>
        <th>Цена</th>
        <th>Дата</th>
      </tr>
    </thead>
    <tbody>
      <SaleRow
        v-for="sale in sales"
        :key="sale.id"
        :sale="sale"
      />
    </tbody>
  </table>
</template>

<script>
import SaleRow from '@/components/SaleRow.vue';

export default {
  name: 'SaleTable',
  components: {
    SaleRow,
  },
  props: {
    sales:{
      type: Array,
    }
  }
};
</script>

<style scoped>
.order-table {
  width: 100%;
  border-collapse: collapse;
}
.order-table th,
.order-table td {
  padding: 8px;
  text-align: left;
}
.order-table th {

}
</style>
