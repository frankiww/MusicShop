<!-- 2B2D42 -->
<!-- 8D99AE -->
<!-- EDF2F4 -->

<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2B2D42;
  margin-top: 0px;

}
body{
    background-color: #EDF2F4;
}
</style>
