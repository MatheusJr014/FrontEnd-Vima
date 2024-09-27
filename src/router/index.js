import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarrinhoView from '../views/CarrinhoView.vue'
import ProductView from '../views/ProductView.vue'
import ContactView from '../views/ContactView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/admin/AdminView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: () => import('@/components/ProductDetails.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      
      component: () => import('../views/CarrinhoView.vue')
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
      component:() => import('../views/admin/AdminView.vue')
    },
    {
      path: '/registerProduct',
      name: 'registerProduct',
      component:() => import('../views/admin/RegisterProductView.vue')
    },
    {
      path: '/editProduct',
      name: 'editProduct',
      component:()=>import('../views/admin/EditProductView.vue')
    },
    {
      path: '/deleteProduct',
      name: 'deleteProduct',
      component:()=>import('../views/admin/DeleteProductView.vue')
    },
    {
      path: '/testCart/:id',
      name: 'test',
      component:()=>import('@/components/ProductDetails/ProductComponents.vue')  

    }
  ]
})

export default router
