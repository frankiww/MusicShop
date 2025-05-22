<template>
    <div class=modal>
        <h2>Оформление заказа</h2>
        <h3>{{recording.name}}</h3>

        <table>
            <thead>
                <tr>
                    <th>Магазин</th>
                    <th>В наличии</th>
                    <th>Заказать</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="store in stores" :key="store.id">
                <td>{{ store.name }}</td>
                <td>{{ store.stock }}</td>
                <td>
                <input 
                    type="number" 
                    min="0"
                    v-model.number="quantities[store.id]" />
                </td>
            </tr>
            </tbody>
      </table>

      <div class="sum">
        <p>Оптовая цена: {{ recording.wholesale_price }} ₽</p>
        <p>Итого: {{ totalPrice }} ₽</p>
      </div>

      <div class="buttons">
        <button @click="submit">Оформить заказ</button>
        <button @click="$emit('close')">Отмена</button>
      </div>
    </div>
</template>

<script>
    export default{
        name: 'OrderTable',
        props: {
            recording: Object,
            onClose: Function,
        },
        data(){
            return{
                stores: [],
                quantities: {}, 
            };
        },
        computed: {
            totalPrice() {
                return Object.entries(this.quantities)
                    .reduce((sum, entry) => {
                        const quantity = parseInt(entry[1]);
                        return sum + (isNaN(quantity) ? 0 : quantity * parseFloat(this.recording.wholesale_price));
                    }, 0)
            }
        },
        async mounted(){
            await this.fetchCatalog()
        },
        methods: {
            async fetchCatalog() {
                try {
                    const id = this.recording.id;

                    const res = await fetch(`/api/stores`);
                    const allstores = await res.json();

                    const availres = await fetch(`/api/recordings/${id}/available`);
                    const avail = await availres.json();

                    const stockmap = {};
                    for (const item of avail) {
                        stockmap[item.storeId] = item.stock;
                    }

                    this.stores = allstores.map(s => ({
                        ...s,
                        stock: stockmap[s.id] || 0,
                    }));
                    console.log("All stores:", allstores);
                    console.log("Available stock:", avail);

                    console.log("магазины: ", this.stores);
                    
                } catch (err) {
                    console.error(err);
                }
            },

            async submit(){
                const orders = Object.entries(this.quantities)
                // eslint-disable-next-line
                    .filter(([storeId, qty]) => parseInt(qty)>0)
                    .map(([storeId, qty]) => ({
                        storeId: parseInt(storeId),
                        recordingId: this.recording.id,
                        quantity: parseInt(qty),
                    }));
                if (orders.length===0) {
                    alert("Вы не заполнили форму!");
                    return;
                }

                try {
                    await fetch('/api/orders', {
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