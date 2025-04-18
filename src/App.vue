<script setup>
  import Header from "./components/sections/Header.vue"
  import Footer from "./components/sections/Footer.vue"
</script>

<template>
  <Header />
  <div id="page">
    <router-view />
  </div>
  <Footer />
</template>

<style>
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #page {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>