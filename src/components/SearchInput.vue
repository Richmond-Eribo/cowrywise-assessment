<script setup lang="ts">
const query = defineModel()
</script>

<template>
  <div class="input-container">
    <!-- Search SVG -->
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
      class="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>

    <input
      v-model="query"
      type="text"
      placeholder="Search for photo"
      class="input-container__input"
    />

    <!-- cancel SVG -->
    <svg
      v-if="query"
      @click="query = ''"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-x"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </div>
</template>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.input-container {
  display: flex;
  align-items: center;
  padding: $spacing-md;
  font-size: $font-size-lg;
  border-radius: $border-radius-lg;
  background-color: $white;
  color: $text-secondary;
  overflow: hidden;
  // width: 100%;
  width: clamp($unit-80, 90vw, $unit-288);
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.05);
  &__input {
    flex-grow: 1;
  }
}
</style>
