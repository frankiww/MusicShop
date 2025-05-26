<template>
    <div class=modal>
        <h2>Оформление заказа</h2>
        <h3>{{store.name}}</h3>

        <SearchPanel
            v-model:search="searchQuery"
        />

        <table>
            <thead>
                <tr>
                    <th>Запись</th>
                    <th>Оптовая цена</th>
                    <th>В наличии</th>
                    <th>Заказать</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="rec in recordings" :key="rec.id">
                <td>{{rec.name}} ({{rec.Medium.name}})</td>
                <td>{{rec.wholesale_price}}</td>
                <td>{{rec.stock}}</td>
                <td>
                <input 
                    type="number" 
                    min="0"
                    v-model.number="quantities[rec.id]" />
                </td>
            </tr>
            </tbody>
      </table>

      <div class="sum">
        <p>Итого: {{ totalPrice }} ₽</p>
      </div>

      <div class="buttons">
        <button @click="submit">Оформить заказ</button>
        <button @click="$emit('close')">Отмена</button>
      </div>
    </div>
</template>

<script>

    import SearchPanel from '@/components/SearchPanel.vue';

    export default{
        name: 'OrderFormRec',
        components: {
            SearchPanel
        },
        props: {
            store: Object,
            onClose: Function,
        },
        data(){
            return{
                recordings: [],
                quantities: {}, 
                searchQuery: '',
            };
        },
        computed: {
            totalPrice() {
                return this.recordings.reduce((sum, rec) => {
                    const qty = this.quantities[rec.id] || 0;
                    return sum + qty*parseFloat(rec.wholesale_price);
                }, 0)
            }
        },
        async mounted(){
            await this.fetchCatalog();
        },
        watch: {
            searchQuery: 'fetchCatalog',
        },
        methods: {

            async fetchCatalog() {
                try {

                    const res = await fetch(`/api/recordings`);
                    const allrecs = await res.json();

                    const params = new URLSearchParams();
                    params.append('storeId', this.store.id);
                    if (this.searchQuery) params.append('title', this.searchQuery);

                    const availres = await fetch(`/api/recordings/inStore?${params.toString()}`);
                    const avail = await availres.json();

                    const availIds = new Set(avail.map(r => r.id));

                    const stockmap = {};
                    for (const item of avail) {
                        stockmap[item.id] = item.Catalogs[0].stock;
                    }

                    const filtered = this.searchQuery
                        ? allrecs.filter(r => availIds.has(r.id))
                        : allrecs;

                    this.recordings = filtered.map(r => ({
                        ...r,
                        stock: stockmap[r.id] || 0,
                    }));
                    
                } catch (err) {
                    console.error(err);
                }
            },

            async submit(){
                const orders = Object.entries(this.quantities)
                    .filter(([, qty]) => parseInt(qty)>0)
                    .map(([recordingId, qty]) => ({
                        storeId: this.store.id,
                        recordingId: parseInt(recordingId),
                        quantity: parseInt(qty),
                    }));
                if (orders.length===0) {
                    alert("Вы не заполнили форму!");
                    return;
                }

                try {
                    await fetch('/api/orders/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({orders}),
                    });
                    alert('Заказ успешно оформлен!');
                    this.onClose();
                } catch(err){
                    console.error(err);
                    alert('Кажется что-то пошло не так!');
                }
            },
        },
    };
</script>

<style scoped>
    .modal {
    padding: 20px;
    border: 1px solid #2B2D42;
    max-width: 50%;
    margin: 0 auto;
    }
    .sum {
    margin-top: 10px;
    }
    .buttons {
    margin-top: 20px;
    }
    button{
        background-color: #8D99AE;
        color: #2B2D42;
        padding: 0.5%;
        border: 1px solid #EDF2F4;
        font-size: 100%;
        cursor: pointer;
    }
    th, td {
        padding: 10px;
        border-bottom: 2px solid #8D99AE;
    }
    input {
        width: 45%;

    }
    tr{
        text-align: center
    }
</style>