import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import ProductView from '../views/ProductView.vue'
import ContactView from '../views/ContactView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/login', 
      name: 'login', 
      component: ()=> import('../views/LoginView.vue')
    },
    {
      path: '/register', 
      name: 'register', 
      component: ()=> import ('../views/RegisterView.vue')
    },
    {
      path: '/admin', 
      name: 'admin', 
      component:() => import('../views/AdminView.vue')
    },
    {
      path: '/registerProduct',
      name: 'registerProduct',
      component:() => import('../views/RegisterProductView.vue')
    },
    {
      path: '/editProduct',
      name: 'editProduct',
      component:()=>import('../views/EditProductView.vue')
    },
    {
      path: '/deleteProduct',
      name: 'deleteProduct',
      component:()=>import('../views/DeleteProductView.vue')
    }
  ]
})

export default router
