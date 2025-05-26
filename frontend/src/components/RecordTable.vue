<template>
  <table class="record-table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Год</th>
        <th>Носитель</th>
        <th>Исполнители</th>
        <th>Жанры</th>
        <th>Оптовая цена</th>
        <th v-if="showPrice">Розничная цена</th>
        <th v-if="showPrice">В наличии</th>
      </tr>
    </thead>
    <tbody>
      <RecordRow
        v-for="record in records"
        :key="record.id"
        :record="record"
        :showPrice="showPrice"
        @click="goToDetails(record.id)"
      />
    </tbody>
  </table>
</template>

<script>
import RecordRow from '@/components/RecordRow.vue';

export default {
  name: 'RecordTable',
  components: {
    RecordRow,
  },
  props: {
    records: {
      type: Array,
      required: true,
    },
    showPrice: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToDetails(id) {
      this.$router.push(`/recordings/${id}`);
    }
  }
};
</script>

<style scoped>
.record-table {
  width: 100%;
  border-collapse: collapse;
}
.record-table th,
.record-table td {
  padding: 8px;
  text-align: left;
}
.record-table th {

}
</style>
