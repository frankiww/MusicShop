<template>
  <tr>
    <td>{{ storeName }}</td>
    <td>{{ recordName }}</td>
    <td>{{ order.quantity}}</td>
    <td>{{ order.price}}</td>
  </tr>
</template>

<script>
export default {
  name: 'OrderRow',
  props: {
    order: Object,
    storeName: String,
    recordName: String,
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
