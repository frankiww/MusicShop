<template>
  <tr>
    <td>{{ sale.Store.name }}</td>
    <td>{{ sale.Recording.name }} ({{sale.Recording.Medium.name}})</td>
    <td>{{ sale.quantity}}</td>
    <td>{{ sale.price}}</td>
    <td>{{ sale.createdAt.split('T')[0]}}</td>
  </tr>
</template>

<script>
export default {
  name: 'SaleRow',
  props: {
    sale: Object,
  },
};
</script>

<style scoped>
td {
  padding: 8px;
  border: 1px solid #2B2D42;
}
ul {
  list-style-type: none;
}
</style>
