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
      path: '/admin', 
      name: 'admin', 
      component:() => import('../views/admin/AdminView.vue')
    },
    {
      path: '/registerProduct',
      name: 'registerProduct',
      component:() => import('../views/admin/BACKUP-TRASH/RegisterProductView.vue')
    },
    {
      path: '/editProduct',
      name: 'editProduct',
      component:()=>import('../views/admin/BACKUP-TRASH/EditProductView.vue')
    },
    {
      path: '/deleteProduct',
      name: 'deleteProduct',
      component:()=>import('../views/admin/BACKUP-TRASH/DeleteProductView.vue')
    },
    {
      path: '/productSelecionado/:id',
      name: 'productSelecionado',
      component:()=>import('../views/ProductView.vue'),  
      props: true 
    },
    {
      path: '/usuario',
      name: 'usuario',
      component:()=>import('../components/UsuariosComponents/Login-Cadastro/LoginRegisterComponent.vue'),  
      props: true 
    }
  ]
})

export default router
