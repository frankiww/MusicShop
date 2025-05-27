<template>
  <table class="order-table">
    <thead>
      <tr>
        <th>Магазин</th>
        <th>Запись</th>
        <th>Количество</th>
        <th>Цена</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <OrderRow
        v-for="order in orders"
        :key="order.id"
        :order="order"
        :storeName="getStoreName(order.storeId)"
        :recordName="getRecordingName(order.recordingId)"
      />
    </tbody>
  </table>
</template>

<script>
import OrderRow from '@/components/OrderRow.vue';

export default {
  name: 'OrderTable',
  components: {
    OrderRow,
  },
  data(){
    return {
        orders: [],
        stores: [],
        recordings: [],
    };
  },
  async mounted(){
    await this.fetchData();
  },
  methods: {
    async fetchData(){
        try{
            const [ordersRes, storesRes, recordingsRes] = await Promise.all([
                fetch('api/orders/'),
                fetch('api/stores/'),
                fetch('api/recordings/'),
            ]);

            this.orders = await ordersRes.json();
            this.stores = await storesRes.json();
            this.recordings = await recordingsRes.json();
        } catch (err) {
            console.error(err);
        }
    },
    getStoreName(id){
        const store = this.stores.find(s => s.id===id);
        return store ? store.name : `#${id}`;
    },
    getRecordingName(id){
        const rec = this.recordings.find(r => r.id === id);
        return rec ? `${rec.name} (${rec.Medium.name})` : `#${id}`;
    },
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
