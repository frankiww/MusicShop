<template>
  <tr>
    <td>{{ shop.name }}</td>
    <td>{{ catalog?.retail_price ?? '-' }}</td>
    <td>{{ recording.wholesale_price}}</td>
    <td>{{ catalog?.stock ?? 0 }}</td>
  </tr>
</template>

<script>
export default {
  name: 'ShopRow',
  props: {
    shop: {
      type: Object,
      required: true
    },
    catalog: {
        type: Object,
        default: null
    },
    recording: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
td {
  padding: 8px;
  border: 1px solid #2B2D42;
  cursor: pointer;
}
tr:hover{
  background-color: #8D99AE;
}
</style>