<!-- Главная страница -->

<template>
    <div class="stores-view">
        <h1>Список магазинов</h1>

        <SearchPanel
            v-model:search="searchQuery"
        />

        <ShopTable 
        :shops="stores"/>

        
    </div>
</template>

<script>
    import SearchPanel from '@/components/SearchPanel.vue';
    import ShopTable from '@/components/ShopTable.vue';

    export default {
        name: 'ShopsView',
        components: {
            SearchPanel,
            ShopTable
        },
        data(){
            return{
                searchQuery: '',
                stores: []
            }
        },
        mounted(){
            this.fetchStores();
        },
        watch: {
            searchQuery: 'fetchStores',
        },
        methods: {
            async fetchStores() {
                try {
                    const params = new URLSearchParams();
                    if (this.searchQuery) params.append('name', this.searchQuery);

                    const response = await fetch(`/api/stores?${params.toString()}`);
                    this.stores = await response.json();
                } catch (error) {
                    console.error('Ошибка при загрузке записей:', error);
                }
            }

        }
    }
</script>

<style>
</style>
