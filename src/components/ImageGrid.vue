<script setup lang="ts">
import { computed } from "vue"
import type { Image } from "../types"
import ImageContainer from "./ImageContainer.vue"
import Skeleton from "./Skeleton.vue"

const props = defineProps<{
  images: Image[]
  loading: boolean
}>()

const emit = defineEmits(["open-modal"])

const ImagesGrid = computed(() => {
  const columns: Image[][] = [[], [], []]
  props.images.forEach((image, index) => {
    columns[index % 3].push(image)
  })
  return columns
})

const openModal = (image: Image) => {
  emit("open-modal", image)
}
</script>

<template>
  <section class="image-grid">
    <div v-if="loading">
      <Skeleton />
    </div>

    <div v-else class="image-grid__content">
      <div
        v-for="(column, columnIndex) in ImagesGrid"
        :key="columnIndex"
        class="image-grid__column"
      >
        <div
          v-for="image in column"
          :key="image.id"
          class="image-grid__item"
          @click="openModal(image)"
        >
          <div class="image-grid__image-wrapper">
            <ImageContainer
              :src="image.urls.small"
              :alt="image.alt_description"
              :blur-hash="image.blur_hash"
              custom-class="image-grid__img"
            />
          </div>
          <div class="image-grid__overlay">
            <p class="image-grid__photographer">{{ image.user.name }}</p>
            <p class="image-grid__location">{{ image.user.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/mixins";

.image-grid {
  &__content {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-2xl $spacing-2xl;
    max-width: 1020px;
    margin: 0 auto;

    @include respond-to("medium") {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to("large") {
      grid-template-columns: repeat(3, 1fr);
    }
    // &__column {
    //   column-gap: $spacing-md;
    // }
  }

  &__item {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: $border-radius;
    transition: transform $transition-base;
    margin-bottom: $spacing-2xl;

    &:hover {
      transform: scale(1.02);

      // .image-grid__overlay {
      //   opacity: 1;
      // }
    }
  }

  &__image-wrapper {
    // height: ;
    // widht: ;
    position: relative;
  }

  &__img {
    width: 100%;
    height: auto;
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, $black 0%, transparent 45%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: $spacing-md;
    // opacity: 0;
    // transition: opacity $transition-base;
  }

  &__photographer,
  &__location {
    color: $white;
    margin: 0;
  }

  &__photographer {
    // font-weight: bold;
    font-size: $font-size-base;
    // margin-bottom: $spacing-sm;
    text-transform: capitalize;
  }

  &__location {
    font-size: $font-size-sm;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
