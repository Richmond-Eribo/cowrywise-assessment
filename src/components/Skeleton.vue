<script setup lang="ts"></script>

<template>
  <div class="loading">
    <div v-for="i in 9" :key="i" class="loading__skeleton"></div>
  </div>
</template>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.loading {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: $spacing-md;

  @include respond-to("medium") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to("large") {
    grid-template-columns: repeat(3, 1fr);
  }
  &__skeleton {
    background-color: $skeleton-color;
    height: 200px;
    border-radius: $border-radius;
    animation: pulse 1.5s infinite;
  }
}
</style>
