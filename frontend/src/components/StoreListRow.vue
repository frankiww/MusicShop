<template>
  <tr>
    <td>{{ store.name }}</td>
    <td>{{ store.unique }}</td>
    <td>{{ store.total }}</td>
  </tr>
</template>

<script>
export default {
  name: 'StoreListRow',
  props: {
    store: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
td {
  padding: 8px;
  border: 1px solid #2B2D42;
  cursor: pointer;
}
ul {
  list-style-type: none;
}
</style>
