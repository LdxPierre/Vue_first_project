import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue')
    },
    {
      path: '/products',
      name: 'products',
      children: [
        {
          path: '',
          name: 'products-list',
          component: () => import('@/pages/ProductsList.vue')
        },
        {
          path: 'new',
          name: 'product-new',
          component: () => import('@/pages/ProductNew.vue')
        },
        {
          path: ':slug',
          name: 'product-show',
          component: () => import('@/pages/ProductShow.vue')
        }
      ]
    },
    {
      path: '/brands',
      name: 'brands',
      component: () => import('@/pages/Brands.vue')
    }
  ]
})

export default router
