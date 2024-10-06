<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <div v-show="visible" class="scroll-to-top" @click="scrollToTop">
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
      class="lucide lucide-chevron-up"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/mixins";

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: $accent-color;
  color: $white;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: $z-index-modal;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;

  &:hover {
    background-color: #555;
  }

  &[style*="display: none"] {
    display: none;
  }
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
}
</style>
