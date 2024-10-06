import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import SearchResults from "../views/SearchResults.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/search",
    name: "search",
    component: SearchResults,
    // props: (route) => ({ query: route.query.q })
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
