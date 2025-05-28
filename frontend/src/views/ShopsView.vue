<!-- Главная страница -->

<template>
    <div class="stores-view">
        <h1>Список магазинов</h1>

        <SearchPanel
            v-model:search="searchQuery"
        />

        <StoreListTable 
        :stores="stores"/>
    </div>
</template>

<script>
    import SearchPanel from '@/components/SearchPanel.vue';
    import StoreListTable from '@/components/StoreListTable.vue';

    export default {
        name: 'ShopsView',
        components: {
            SearchPanel,
            StoreListTable
        },
        data(){
            return{
                searchQuery: '',
                stores: []
            }
        },
        async mounted(){
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

<style scoped>
    .stores-view{
        margin: 20px;
    }
</style>
