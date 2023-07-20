import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/products',
      name: 'products',
      children: [
        {
          path: '',
          name: 'products-index',
          component: () => import('@/pages/ProductsIndex.vue')
        },
        {
          path: 'create',
          name: 'products-create',
          component: () => import('@/pages/ProductsNew.vue')
        },
        {
          path: ':slug',
          name: 'products-show',
          component: () => import('@/pages/ProductsShow.vue')
        }
      ]
    },
    {
      path: '/brands',
      name: 'brands-index',
      component: () => import('@/pages/BrandsIndex.vue')
    }
  ]
})

export default router
