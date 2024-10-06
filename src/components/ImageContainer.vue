<script setup lang="ts">
import { ref, onMounted } from "vue"
import { decode } from "blurhash"

interface Props {
  src: string
  blurHash: string
  alt?: string
  customClass?: string
  smallSrc?: string
}

const props = defineProps<Props>()

// Decode blurhash into an image URL
const decodeBlurHash = (
  blurHash: string,
  width: number,
  height: number
): string => {
  // console.log(isBlurhashValid(blurHash), blurHash, props.alt, props.src)
  const pixels = decode(blurHash, width, height)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")
  if (ctx) {
    const imageData = ctx.createImageData(width, height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  }

  return canvas.toDataURL()
}

// Component Logic

const imageLoaded = ref(false)
const blurUrl = ref("")
const width = 24
const height = 24

onMounted(() => {
  if (props.smallSrc) {
    blurUrl.value = props.smallSrc!
    return
  }
  blurUrl.value = decodeBlurHash(props.blurHash, width, height)
})

const handleImageLoad = () => {
  imageLoaded.value = true
}
</script>

<template>
  <img
    :src="imageLoaded ? src : blurUrl"
    :alt="alt || 'Loading image...'"
    @load="handleImageLoad"
    :class="['image', customClass]"
    loading="lazy"
  />
</template>

<style scoped>
.image {
  /* display: block; */
  width: 100%;
  transition: opacity 0.3s ease;
}

.loaded {
  opacity: 1;
}
</style>
