<template>
    <div v-if="recording" class="details">
        <div class="info">
            <h1>Информация о записи</h1>
            <p>Название: {{recording.name}}</p>
            <p>Исполнители:</p>
            <ul>
                <li v-for="artist in recording.Artists" :key="artist.id">
                {{ artist.name }}
                </li>
            </ul>
            <p>Жанры:</p>
            <ul>
                <li v-for="genre in recording.Genres" :key="genre.id">
                {{ genre.name }}
                </li>
            </ul>
            <p>Носитель: {{recording.Medium.name}}</p>
            <p>Год: {{recording.year}}</p>
        </div>

        <button @click="showOrderModal = true">Создать заказ</button>
        <OrderTable
            v-if="showOrderModal"
            :recording="recording"
            @close="showOrderModal=false" />


        <div v-if="shopsWith.length>0">
            <h2>В наличии:</h2>
            <ShopTable
                :shops="shopsWith.map(s => s.Store)"
                :catalogs="shopsWith"
                :recording="recording" />
        </div>
        <div v-else><h3>Запись не доступна ни в одном магазине </h3></div>

        <div v-if="shopsWithout.length>0">     
            <h2>Нет в наличии:</h2>
            <ShopTable
                :shops="shopsWithout.map(s => s.Store)"
                :recording="recording" />
        </div>
        <div v-else><h3>Запись доступна во всех магазинахദ്ദി( • ᴗ - ) ✧</h3></div>
    </div>
    <div v-else>
        <h3 class="error">Кажется что-то пошло не так...</h3>
    </div> 

</template>

<script>
    import ShopTable from '@/components/ShopTable.vue';
    import OrderTable from '@/components/OrderTable.vue';

    export default{
        name: 'RecordDetails',
        components: {
            ShopTable,
            OrderTable
        },
        data(){
            return{
                recording: null,
                shopsWith: [],
                shopsWithout: [], 
                showOrderModal: false
            };
        },
        mounted(){
            this.fetchRecording();
            this.fetchShopsWith();
            this.fetchShopsWithout();
        },
        methods: {
            async fetchRecording(){
                try{
                    const id = this.$route.params.id;
                    const res = await fetch(`/api/recordings/${id}`);
                    this.recording = await res.json();
                } catch(err){
                    console.error(err);
                }
            },
            async fetchShopsWith(){
                try{
                    const id = this.$route.params.id;
                    const res = await fetch(`/api/recordings/${id}/available`);
                    this.shopsWith = await res.json();
                } catch(err){
                    console.error(err);
                }
            },
            async fetchShopsWithout(){
                try{
                    const id = this.$route.params.id;
                    const res = await fetch(`/api/recordings/${id}/unavailable`);
                    this.shopsWithout = await res.json();
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
    .info{

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
</style>
