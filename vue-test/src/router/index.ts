import { createRouter, createWebHistory } from 'vue-router'
import createInvoice from "@/components/createInvoice.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: createInvoice,
    },
  ],
})

export default router
