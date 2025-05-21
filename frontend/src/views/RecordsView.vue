<!-- Главная страница -->

<template>
    <div class="records-view p-4">
        <h1 class="text-2x1 font-bold mb-4">Каталог записей</h1>
            <div class="filters felx flex-wrap gap-4 mb-6">
                
                <input v-model="searchQuery"
                type="text"
                placeholder="Поиск по названию"
                class="border p2 rounded w-full sm:w-64" />

                <select v-model="selectedGenre" class="border p-2 ronded">
                    <option value="">Все жанры</option>
                    <option></option>
                </select>

                <select v-model="selectedArtist" class="border p-2 ronded">
                    <option value="">Все исполнители</option>
                    <option></option>
                </select>

                <select v-model="selectedMedium" class="border p-2 ronded">
                    <option value="">Все носители</option>
                    <option></option>
                </select>
                
            </div>

            <table class="w-full border-collapse">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Исполнитель</th>
                        <th>Жанр</th>
                        <th>Носитель</th>
                        <th>Год</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
    </div>
</template>

<script>
    export default {
        name: 'RecordsView',
    }
</script>
