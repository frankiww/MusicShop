<template>
  <table class="stores-table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Записей</th>
        <th>Экземпляров</th>
      </tr>
    </thead>
    <tbody>
      <StoreListRow
        v-for="store in stores"
        :key="store.id"
        :store="store"
      />
    </tbody>
  </table>
</template>

<script>
import StoreListRow from '@/components/StoreListRow.vue';

export default {
  name: 'StoreListTable',
  components: {
    StoreListRow,
  },
  props: {
    stores: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.stores-table {
  width: 100%;
  border-collapse: collapse;
}
.stores-table th,
.stores-table td {
  padding: 8px;
  text-align: left;
}
.stores-table th {

}
</style>
