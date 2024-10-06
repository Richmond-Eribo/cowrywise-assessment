<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useImageApi } from "../composables/useImageApi"
import ImageGrid from "../components/ImageGrid.vue"
import ImageModal from "../components/ImageModal.vue"
import SearchTitle from "../components/SearchTitle.vue"
import { Image } from "../types"

const { images, loading, error, noImageFound, fetchImages } = useImageApi()
const selectedImage = ref<Image | null>(null)

const route = useRoute()
const router = useRouter()

const query = route.query.q as string

const openModal = (image: any) => {
  selectedImage.value = image
}

const closeModal = () => {
  selectedImage.value = null
}

onMounted(() => {
  if (!query) router.push({ name: "home" })
  fetchImages(query)
})

watch(
  () => query,
  () => {
    if (!query) router.push({ name: "home" })
    fetchImages(query as string)
  }
)
</script>

<template>
  <div class="app">
    <header class="header">
      <SearchTitle
        :search-param="`${$route.query.q}`"
        :empty-image="noImageFound"
      />
    </header>

    <main class="container">
      <transition name="fade">
        <div v-if="error" class="error" role="alert">
          <strong>Error:</strong>
          <span>{{ error }}</span>
        </div>
      </transition>
      <ImageGrid :images="images" :loading="loading" @open-modal="openModal" />
    </main>

    <transition name="fade">
      <ImageModal
        v-if="selectedImage"
        :image="selectedImage"
        @close="closeModal"
      />
    </transition>
  </div>
</template>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: $primary-color;
  padding: $spacing-xl 0;
  margin-bottom: $spacing-xl;
  height: 250px;
  display: grid;
  place-content: center;
  margin-bottom: -$unit-9;
}

.error {
  background-color: $error-background;
  color: $error-text;
  padding: $spacing-md;
  margin-bottom: $spacing-md;
  border-radius: $border-radius;

  strong {
    margin-right: $spacing-sm;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-base;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
