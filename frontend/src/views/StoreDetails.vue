<template>
    <div v-if="store" class="details">
            <button class="back" @click="$router.go(-1)">Назад</button>
            <div class="info">
                <h1>Информация о магазине</h1>
                <p>Название: {{store.name}}</p>
                <p>Записей: {{store.unique}}</p>
                <p>Экзмепляров: {{store.total}}</p>
            </div>

            <button @click="showOrderModal = true">Создать заказ</button>
            <OrderFormRec
            v-if="showOrderModal"
            :store="store"
            @close="showOrderModal=false" />

            <div class="controls">
                <button @click="activeTab = 'avail'" :class="{ active: activeTab === 'avail' }">В наличии</button>
                <button @click="activeTab = 'unavail'" :class="{ active: activeTab === 'unavail' }">Нет в наличии</button>
            </div>

            <div v-if="activeTab === 'avail'">
                <FilterPanel
                v-model:search="searchQuery"
                v-model:genre="selectedGenre"
                v-model:artist="selectedArtist"
                v-model:medium="selectedMedium"
                :genres="genres"
                :artists="artists"
                :mediums="mediums"
                />
                <div v-if="availRecs.length>0">
                    <h2>В наличии:</h2>
                    <RecordTable 
                    :records="availRecs"
                    :showPrice="true"
                    />
                </div>
                <div v-else><h3>Ничего не найдено.</h3></div>
            </div>

            <div v-if="activeTab === 'unavail'">
                <FilterPanel
                v-model:search="searchQueryU"
                v-model:genre="selectedGenreU"
                v-model:artist="selectedArtistU"
                v-model:medium="selectedMediumU"
                :genres="genres"
                :artists="artists"
                :mediums="mediums"
                />
                <div v-if="unavailRecs.length>0">
                    <h2>Нет в наличии:</h2>
                    <RecordTable 
                    :records="unavailRecs"
                    />
                </div>
                <div v-else><h3>Ничего не найдено.</h3></div>
            </div>
    </div>
    <div v-else>
        <h3 class="error">Загрузка...</h3>
    </div> 
</template>

<script>
    import FilterPanel from '@/components/FilterPanel.vue';
    import RecordTable from '@/components/RecordTable.vue';
    import OrderFormRec from '@/components/OrderFormRec.vue';

    export default{
        name: 'StoreDetails',
        components: {
            FilterPanel,
            RecordTable,
            OrderFormRec
        },
        data(){
            return{
                searchQuery: '',
                selectedGenre: '',
                selectedArtist: '',
                selectedMedium: '',
                searchQueryU: '',
                selectedGenreU: '',
                selectedArtistU: '',
                selectedMediumU: '',
                genres: [],
                artists: [],
                mediums: [],
                store: null,
                availRecs: [],
                unavailRecs: [],
                showOrderModal: false,
                sales: [],
                activeTab: 'avail',
            }
        },
        async mounted() {
            try {
                await this.fetchShop();
                await this.fetchFilterData();
                await this.fetchAvailRecs();
                await this.fetchUnavailRecs();

            } catch (err) {
                console.error(err);
            }
        },
        watch: {
            searchQuery: 'fetchAvailRecs',
            selectedGenre: 'fetchAvailRecs',
            selectedArtist: 'fetchAvailRecs',
            selectedMedium: 'fetchAvailRecs',
            searchQueryU: 'fetchUnavailRecs',
            selectedGenreU: 'fetchUnavailRecs',
            selectedArtistU: 'fetchUnavailRecs',
            selectedMediumU: 'fetchUnavailRecs',
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
            async fetchAvailRecs(){
                try{
                    const params = new URLSearchParams();
                    if (this.searchQuery) params.append('title', this.searchQuery);
                    if (this.selectedGenre) params.append('genreId', this.selectedGenre);
                    if (this.selectedArtist) params.append('artistId', this.selectedArtist);
                    if (this.selectedMedium) params.append('mediumId', this.selectedMedium);
                    params.append('storeId', this.store.id);

                    const response = await fetch(`/api/recordings/inStore?${params.toString()}`);
                    this.availRecs = await response.json();
                } catch(err){
                    console.error(err);
                }

            },
            async fetchUnavailRecs(){
                try{
                    const params = new URLSearchParams();
                    if (this.searchQueryU) params.append('title', this.searchQueryU);
                    if (this.selectedGenreU) params.append('genreId', this.selectedGenreU);
                    if (this.selectedArtistU) params.append('artistId', this.selectedArtistU);
                    if (this.selectedMediumU) params.append('mediumId', this.selectedMediumU);
                    params.append('storeId', this.store.id);

                    const response = await fetch(`/api/recordings/notInStore?${params.toString()}`);
                    this.unavailRecs = await response.json();
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
    .controls button{
        background-color: #EDF2F4;
        border: 2px solid #8D99AE;
    }
    .controls button.active{
        background-color: #8D99AE;

    }
</style>