<template>
    <div class="search-panel">
        
        <input
            type="text"
            :value="search"
            @input="$emit('update:search', $event.target.value)"
            placeholder="Поиск по названию"
            class="filter-input" />
    </div>
</template>

<script>
    export default{
        name: 'SearchPanel',
        props: {
        search: String,
        }
    }
</script>

<style scoped>
    .search-panel{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }
    input {
        padding: 6px;
    }
</style>



