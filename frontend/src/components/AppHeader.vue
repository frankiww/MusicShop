<!-- Шапка с навигацией -->
<!-- Записи, Магазины, Аналитика, Войти как админ -->

<template>
    <header class="header">
        <nav class="nav">
            <router-link to="/" class="nav-link">Записи</router-link>
            <router-link to="/shops" class="nav-link">Магазины</router-link>
            <router-link to="/analytics" class="nav-link">Аналитика</router-link>
            <router-link to="/sales" class="nav-link">Продажи</router-link>
            <router-link to="/orders" class="nav-link">Заказы</router-link>
            <router-link to="/admin" class="nav-link admin-link">Админ</router-link>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'AppHeader'
    }
</script>

<style scoped>
    .header{
        background-color: #2B2D42;
        padding: 1rem;
    }
    .nav{
        display: flex;
        gap: 1rem;
    }
    .nav-link{
        color: #EDF2F4;
        text-decoration: none;
    }
    .admin-link{
        margin-left: auto;
    }
</style>