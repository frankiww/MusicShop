<template>
    <div v-if="store" class="details">
            <div class="info">
                <h1>Информация о магазине</h1>
                <p>Название: {{store.name}}</p>
                <p>Записей: {{store.unique}}</p>
                <p>Экзмепляров: {{store.total}}</p>
            </div>




    </div>
    <div v-else>
        <h3 class="error">Кажется что-то пошло не так...</h3>
    </div> 
</template>

<script>

    export default{
        name: 'StoreDetails',
        components: {

        },
        data(){
            return{
                store: null
            };
        },
        mounted(){
            this.fetchShop();
        },
        methods: {
            async fetchShop(){
                try{
                    const id = this.$route.params.id;
                    const res = await fetch(`/api/stores/${id}`);
                    this.store = await res.json();
                } catch(err){
                    console.error(err);
                }
            },
             
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
</style>