<script setup lang="ts">
import { ref } from "vue"
import SearchInput from "./SearchInput.vue"

const emit = defineEmits(["search"])
const query = ref("")

const handleSubmit = () => {
  emit("search", query.value)
}
</script>

<template>
  <header class="search-bar">
    <form @submit.prevent="handleSubmit" class="search-bar__form">
      <SearchInput v-model="query" />
    </form>
  </header>
</template>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/mixins";

.search-bar {
  &__form {
    display: flex;
  }
}
</style>
