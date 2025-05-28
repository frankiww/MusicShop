<template>
    <table v-if="headers.length && data.length">
        <thead>
            <tr>
                <th v-for="h in headers" :key="h.key">{{h.label}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in data" :key="index">
                <td v-for="h in headers" :key="h.key">{{row[h.key]}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default{
        name: 'AnalyticsTable',
        props: {
            type: String,
            data: Array
        },
        computed: {
            headers(){
                switch(this.type){
                    case 'soldQty':
                        return [
                            {key: 'total', label: 'Кол-во экземпляров'}
                        ]
                    case 'topRecs':
                        return [
                            {key: 'name', label: 'Запись'},
                            {key: 'totalSold', label: 'Продаж'},  
                        ]
                    case 'topArtists':
                        return [
                            {key: 'name', label: 'Исполнитель'},
                            {key: 'total', label: 'Продаж'},  
                        ]
                    case 'totalSales':
                        return [
                            {key: 'total', label: 'Сумма'},
                        ]
                    case 'maxProfit':
                        return [
                            {key: 'recName', label: 'Запись'},
                            {key: 'medium', label: 'Носитель'},
                            {key: 'storeName', label: 'Магазин'},
                            {key: 'diff', label: 'Наценка'},
                        ]
                    default: return [];
                }
            }
        }
    };
</script>

<style scoped>
td {
  padding: 8px;
  border: 1px solid #2B2D42;
}
table {
  width: 50%;
  border-collapse: collapse;
  margin: 40px auto;
}
th {
  padding: 8px;
  text-align: left;
}

</style>