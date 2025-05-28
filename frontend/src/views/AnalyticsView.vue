<template>
    <div class="filters">
        <select v-model="selectedStrategy">
            <option disabled value="">Выберите тип аналитики</option>
            <option value="soldQty">Количество проданных экземпляров</option>
            <option value="topRecs">Самые продаваемые записи</option>
            <option value="topArtists">Самые продаваемые исполнители</option>
            <option value="totalSales">Общая стоимость проданных записей</option>
            <option value="maxProfit">Запись с максимальной наценкой</option>
        </select>

        <input type="date" v-model="startDate">
        <input type="date" v-model="endDate">
        <select v-model="storeId">
            <option value="">Все магазины</option>
            <option
                v-for="s in stores"
                :key="s.id"
                :value="s.id">
                {{s.name}}
            </option>
        </select>

        <button @click="fetchAnalytics">Показать</button>
        <button @click="resetFilters">Сбросить</button>

    </div>
    <div v-if="results.length>0">
       <AnalyticsTable 
       :type="appliedStrategy"
       :data="results"/>
    </div>

    <div v-else-if="selectedStrategy&&appliedStrategy" class="noRes">
        <h3>Ничего не найдено</h3>
    </div>



</template>

<script>
    import AnalyticsTable from '@/components/AnalyticsTable.vue';
    export default{
        name: 'AnalyticsView',
        components: {AnalyticsTable},
        data(){
            return{
                stores: [],
                selectedStrategy: '',
                startDate: '',
                endDate: '',
                storeId: '',
                results: [],
                appliedStrategy: '',
            }
        }, 
        mounted(){
            this.fetchStores();
        },
        methods: {
            async fetchStores(){
                try{
                    const res = await fetch('/api/stores');
                    this.stores = await res.json();
                }catch(err){
                    console.error(err);
                }
            },
            async fetchAnalytics(){
                try{
                    const params = new URLSearchParams();
                    if (this.selectedStrategy) params.append('strategy', this.selectedStrategy);
                    if (this.startDate) params.append('startDate', this.startDate);
                    if (this.endDate) params.append('endDate', this.endDate);
                    if (this.storeId) params.append('storeId', this.storeId);

                    const response = await fetch(`/api/analytics?${params.toString()}`);
                    this.results = await response.json();

                    this.appliedStrategy = this.selectedStrategy;

                } catch(err){
                    console.error(err);
                }
            },
            resetFilters() {
                this.selectedStrategy = '';
                this.startDate = '';
                this.endDate = '';
                this.results =[];
            }
        }
}
</script>

<style scoped>
    .filters{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 20px;
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
    .noRes{
        text-align: center;
        margin-top:3%;

    }
</style>