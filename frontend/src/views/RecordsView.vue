<!-- Главная страница -->

<template>
    <div class="records-view">
        <h1>Каталог записей</h1>

        <div class="filters">
            <FilterPanel
                v-model:search="searchQuery"
                v-model:genre="selectedGenre"
                v-model:artist="selectedArtist"
                v-model:medium="selectedMedium"
                :genres="genres"
                :artists="artists"
                :mediums="mediums"
            />
            <button @click="resetFilters">Сбросить</button>
        </div>


        <RecordTable :records="records"/>
    </div>
</template>

<script>
    import FilterPanel from '@/components/FilterPanel.vue';
    import RecordTable from '@/components/RecordTable.vue';

    export default {
        name: 'RecordsView',
        components: {
            FilterPanel,
            RecordTable
        },
        data(){
            return{
                searchQuery: '',
                selectedGenre: '',
                selectedArtist: '',
                selectedMedium: '',
                genres: [],
                artists: [],
                mediums: [],
                records: []
            }
        },
        mounted(){
            this.fetchFilterData();
            this.fetchRecords();
        },
        watch: {
            searchQuery: 'fetchRecords',
            selectedGenre: 'fetchRecords',
            selectedArtist: 'fetchRecords',
            selectedMedium: 'fetchRecords',
        },
        methods: {
            async fetchFilterData(){
                try{
                    const [genresRes, artistsRes, mediumsRes] = await Promise.all([
                        fetch('/api/genres'),
                        fetch('/api/artists'),
                        fetch('/api/mediums')
                    ])
                    this.genres = await genresRes.json()
                    this.artists = await artistsRes.json()
                    this.mediums = await mediumsRes.json()
                } catch(error){
                    console.error(error)
                }
            },
            async fetchRecords() {
                try {
                    const params = new URLSearchParams();
                    if (this.searchQuery) params.append('title', this.searchQuery);
                    if (this.selectedGenre) params.append('genreId', this.selectedGenre);
                    if (this.selectedArtist) params.append('artistId', this.selectedArtist);
                    if (this.selectedMedium) params.append('mediumId', this.selectedMedium);

                    const response = await fetch(`/api/recordings?${params.toString()}`);
                    this.records = await response.json();
                } catch (error) {
                    console.error('Ошибка при загрузке записей:', error);
                }
            },
            resetFilters() {
                this.searchQuery = '';
                this.selectedGenre = '';
                this.selectedArtist = '';
                this.selectedMedium = '';
            }

        }
    }
</script>

<style scoped>
    .records-view{
        margin: 20px;
    }
    .filters{
        display: flex;
    }
    button{
        background-color: #8D99AE;
        color: #2B2D42;
        padding: 0.5%;
        border: 1px solid #EDF2F4;
        font-size: 100%;
        cursor: pointer;
        width: 15%;
        margin: 0 20px;
        height: 100%;
    }
</style>
