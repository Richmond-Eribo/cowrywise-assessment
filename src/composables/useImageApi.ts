import { ref } from "vue"
import axios from "axios"
import type { Image } from "../types"

const API_URL = "https://api.unsplash.com/search/photos"
const ACCESS_KEY = import.meta.env.VITE_APP_UNSPLASH_API

export function useImageApi() {
  const images = ref<Image[]>([])
  const loading = ref(false)
  const noImageFound = ref(false)
  const error = ref<string | null>(null)

  const fetchImages = async (query: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(API_URL, {
        params: {
          query,
          per_page: 30,
          client_id: ACCESS_KEY,
          // orientation: "landscape",
        },
      })
      if (response.data.total == 0) noImageFound.value = true
      images.value = response.data.results
    } catch (err) {
      error.value = "An error occurred while fetching images. Please try again."
      console.error("Error fetching images:", err)
    } finally {
      loading.value = false
    }
  }

  return {
    images,
    loading,
    error,
    noImageFound,
    fetchImages,
  }
}
