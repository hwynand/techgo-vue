import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/danh-sach-san-pham/:type',
      name: 'list-product',
      component: () => import('../views/products/ProductListView.vue')
    },
    {
      path: '/san-pham/:slug',
      name: 'detail-product',
      component: () => import('../views/products/ProductDetailView.vue')
    },
    {
      path: '/dang-nhap',
      name: 'login',
      component: () => import('../views/users/LoginView.vue')
    },
    {
      path: '/productcard',
      name: 'productcard',
      component: () => import('../components/ProductCard.vue')
    }
  ]
})

export default router
