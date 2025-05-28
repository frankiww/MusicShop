<template>
    <div class="sales-view">
        <h1>Продажи</h1>

    <div class="filters">
       <select v-model="storeId">
            <option value="">Все магазины</option>
            <option
                v-for="s in stores"
                :key="s.id"
                :value="s.id">
                {{ s.name }}
            </option>
        </select>
        <input type="date" v-model="startDate">
        <input type="date" v-model="endDate">
        <button @click="fetchSales">Показать</button>
        <button @click="resetFilters">Сбросить</button>


    </div>

        <SaleTable :sales="sales"/>
    </div>
</template>

<script>
    import SaleTable from '@/components/SaleTable.vue';

    export default {
        name: 'SalesView',
        components: {
            SaleTable
        },
        data(){
            return{
                storeId: '',
                startDate: '',
                endDate: '',
                stores: [],
                sales: [],
            }
        },
        mounted(){
            this.fetchStores();
            this.fetchSales();

        },
        methods: {
            async fetchStores(){
                try {
                    const storesRes = await fetch('/api/stores');
                    this.stores = await storesRes.json();
                } catch (error) {
                    console.error('Ошибка при загрузке записей:', error);
                }
            },
            async fetchSales(){
                try {
                    const params = new URLSearchParams();
                    if (this.startDate) params.append('startDate', this.startDate);
                    if (this.endDate) params.append('endDate', this.endDate);
                    if (this.storeId) params.append('storeId', this.storeId);

                    const res = await fetch(`/api/sales?${params.toString()}`);
                    this.sales = await res.json();
                } catch (error) {
                    console.error('Ошибка при загрузке записей:', error);
                }
            },
            resetFilters(){
                this.storeId = '';
                this.startDate = '';
                this.endDate = '';
                this.fetchSales();
            }

        }
    };
</script>

<style scoped>
    .sales-view{
        margin: 20px;
    }
    .filters{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0;
    }
    input,
    select {
        padding: 6px;
    }
    button{
        background-color: #8D99AE;
        color: #2B2D42;
        padding: 0.5%;
        border: 1px solid #EDF2F4;
        font-size: 100%;
        cursor: pointer;
        width: 15%;
    }
</style>
