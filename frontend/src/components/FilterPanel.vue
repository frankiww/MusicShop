<!-- Блок с фильтрами -->
<!-- Жанр, Исполнитель, Носитель -->

<template>
    <div class="filter-panel">
        
        <input
            type="text"
            :value="search"
            @input="$emit('update:search', $event.target.value)"
            placeholder="Поиск по названию"
            class="filter-input" />

        <select
            :value="genre"
            @change="$emit('update:genre', $event.target.value)"
            class="filter-select">
            <option value="">Все жанры</option>
            <option
                v-for="g in genres"
                :key="g.id"
                :value="g.id">
                {{ g.name }}
            </option>
        </select>

        <select
            :value="artist"
            @change="$emit('update:artist', $event.target.value)"
            class="filter-select">
            <option value="">Все исполнители</option>
            <option
                v-for="a in artists"
                :key="a.id"
                :value="a.id">
                {{ a.name }}
            </option>
        </select>


        <select
            :value="medium"
            @change="$emit('update:medium', $event.target.value)"
            class="filter-select">
            <option value="">Все носители</option>
            <option
                v-for="m in mediums"
                :key="m.id"
                :value="m.id">
                {{ m.name }}
            </option>
        </select>
    </div>
</template>

<script>
    export default{
        name: 'FilterPanel',
        props: {
        search: String,
        genre: [String, Number],
        artist: [String, Number],
        medium: [String, Number],
        genres: Array,
        artists: Array,
        mediums: Array
        }
    }
</script>

<style scoped>
    .filter-panel{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }
    .filter-input,
    .filter-select {
        padding: 6px;
    }
</style>



