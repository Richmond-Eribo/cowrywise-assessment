<script setup lang="ts">
defineProps<{
  searchParam: string
  emptyImage?: boolean
}>()
</script>

<template>
  <RouterLink to="/">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-left"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  </RouterLink>
  <div class="search-container">
    <h1 class="search-container__title">
      <span v-if="emptyImage"> There are no Results for </span>
      <span v-else> Search Results for </span>
      <span class="search-container__param"> "{{ searchParam }}" </span>
    </h1>
  </div>
</template>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.search-container {
  width: clamp($unit-80, 90vw, $unit-288);
  display: flex;
  justify-content: space-between;

  &__title {
    font-size: $font-size-3xl;
    color: $text-primary;
    @include respond-to("medium") {
      font-size: $font-size-4xl;
    }
  }
  &__param {
    color: $text-secondary;
  }
}
</style>
