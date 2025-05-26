<template>
    <div v-if="store" class="details">
            <button class="back" @click="$router.go(-1)">Назад</button>
            <div class="info">
                <h1>Информация о магазине</h1>
                <p>Название: {{store.name}}</p>
                <p>Записей: {{store.unique}}</p>
                <p>Экзмепляров: {{store.total}}</p>
            </div>


            <FilterPanel
            v-model:search="searchQuery"
            v-model:genre="selectedGenre"
            v-model:artist="selectedArtist"
            v-model:medium="selectedMedium"
            :genres="genres"
            :artists="artists"
            :mediums="mediums"
            />

            <RecordTable 
            :records="recordings"
            :showPrice="true"
            />
    </div>
    <div v-else>
        <h3 class="error">Загрузка...</h3>
    </div> 
</template>

<script>
    import FilterPanel from '@/components/FilterPanel.vue';
    import RecordTable from '@/components/RecordTable.vue';
    export default{
        name: 'StoreDetails',
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
                store: null,
                recordings: []
            }
        },
        async mounted() {
            try {
                await this.fetchShop();
                await this.fetchFilterData();
                await this.fetchRecordings();
            } catch (err) {
                console.error(err);
            }
        },
        watch: {
            searchQuery: 'fetchRecordings',
            selectedGenre: 'fetchRecordings',
            selectedArtist: 'fetchRecordings',
            selectedMedium: 'fetchRecordings',
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
            async fetchShop(){
                try{
                    const id = this.$route.params.id;
                    const res = await fetch(`/api/stores/${id}`);
                    this.store = await res.json();
                } catch(err){
                    console.error(err);
                }
            },
            async fetchRecordings(){
                try{
                    const params = new URLSearchParams();
                    if (this.searchQuery) params.append('title', this.searchQuery);
                    if (this.selectedGenre) params.append('genreId', this.selectedGenre);
                    if (this.selectedArtist) params.append('artistId', this.selectedArtist);
                    if (this.selectedMedium) params.append('mediumId', this.selectedMedium);
                    params.append('storeId', this.store.id);

                    const response = await fetch(`/api/recordings/inStore?${params.toString()}`);
                    this.recordings = await response.json();
                } catch(err){
                    console.error(err);
                }

            }
             
        }
    }
</script>

<style scoped>
    h1{
        text-align: center;
    }
    .error{
       text-align: center;
       margin: 5%;
    }
    h3{
        text-align: center;
        margin: 3%;
    }
    .details{
        margin: 20px;
    }
    button{
        background-color: #8D99AE;
        color: #2B2D42;
        padding: 0.5%;
        border: 1px solid #EDF2F4;
        font-size: 100%;
        cursor: pointer;
        width: 20%;
        margin: 1% 0;
    }
    .back{
        max-width: 10%;
        margin: 0;
    }
</style>