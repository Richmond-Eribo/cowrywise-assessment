<script setup lang="ts">
import { RouterView } from "vue-router"
import ScrollToTop from "./components/ScrollToTop.vue"
</script>

<template>
  <div class="app">
    <RouterView />
    <ScrollToTop />
  </div>
</template>
