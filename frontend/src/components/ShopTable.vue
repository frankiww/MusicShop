<template>
  <table class="shop-table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Розничная цена</th>
        <th>Оптовая цена</th>
        <th>Количество</th>
      </tr>
    </thead>
    <tbody>
      <ShopRow
        v-for="shop in shops"
        :key="shop.id"
        :shop="shop"
        :catalog="catalogs.find(c => c.storeId === shop.id)"
        :recording="recording"
        @click="goToDetails(shop.id)"
      />
    </tbody>
  </table>
</template>

<script>
import ShopRow from '@/components/ShopRow.vue';

export default {
  name: 'ShopTable',
  components: {
    ShopRow,
  },
  props: {
    shops: {
        type: Array,
        required: true,
    },
    catalogs: {
        type: Array,
        default: () => [],
    },
    recording: {
        type: Object,
        required: true
    }
  },
  methods: {
    goToDetails(id) {
      this.$router.push(`/stores/${id}`);
    }
  }
};
</script>

<style scoped>
.shop-table {
  width: 100%;
  border-collapse: collapse;
}
.shop-table th,
.shop-table td {
  padding: 8px;
  text-align: left;
}
</style>
