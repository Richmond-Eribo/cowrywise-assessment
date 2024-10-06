<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import type { Image } from "../types"
import ImageContainer from "./ImageContainer.vue"

defineProps<{
  image: Image
}>()

const emit = defineEmits(["close"])

const closeModal = () => {
  emit("close")
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleEscape)
})

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape)
})
</script>

<template>
  <div class="image-modal" @click="closeModal">
    <div class="image-modal__content" @click.stop>
      <div class="image-modal__image-wrapper">
        <ImageContainer
          :src="image.urls.full"
          :alt="image.alt_description"
          :blur-hash="image.blur_hash"
          :small-src="image.urls.small"
          custom-class="image-modal__img"
        />
        <!-- <img
          :src="image.urls.full"
          :alt="image.alt_description"
          class="image-modal__img"
        /> -->
        <!-- :height="image.height"
          :width="image.width" -->
      </div>
      <div class="image-modal__info">
        <h2 class="image-modal__photographer">{{ image.user.name }}</h2>
        <!-- <p v-if="image.location.title" class="image-modal__location">{{ image.location.title }}</p> -->
        <p v-if="image.user.location" class="image-modal__description">
          {{ image.user.location }}
        </p>
      </div>
      <button
        class="image-modal__close"
        @click="closeModal"
        aria-label="Close modal"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/mixins";

.image-modal {
  position: fixed;
  inset: 0;
  background-color: rgba($black, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-index-modal;
  padding: $spacing-md;

  &__content {
    position: relative;
    max-width: 95vw;
    width: 100%;
    background-color: $white;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba($black, 0.1);

    @include respond-to("medium") {
      max-width: 65vw;
    }

    @include respond-to("large") {
      max-width: 50vw;
    }
  }

  &__image-wrapper {
    position: relative;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    max-height: 80%;
    object-fit: cover;
    object-position: center;
  }

  &__info {
    padding: $spacing-lg;
    background-color: $white;
    width: 100%;
  }

  &__photographer {
    font-size: $font-size-xl;
    margin-bottom: $spacing-sm;
  }

  &__location {
    font-size: $font-size-base;
    color: $text-secondary;
    margin-bottom: $spacing-sm;
  }

  &__description {
    font-size: $font-size-base;
    line-height: 1.5;
  }

  &__close {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    background: none;
    border: none;
    font-size: $font-size-2xl;
    color: $white;
    cursor: pointer;
    padding: $spacing-sm;
    line-height: 1;
    text-shadow: 0 0 3px rgba($black, 0.5);
    transition: transform $transition-base;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
