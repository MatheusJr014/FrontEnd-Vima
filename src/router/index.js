import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode'; // Importa a biblioteca para decodificar o JWT
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('../views/CarrinhoView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { requiresAuth: true, isAdmin: true }, // Rota protegida
    },
    {
      path: '/productSelecionado/:id',
      name: 'productSelecionado',
      component: () => import('../views/ProductView.vue'),
      props: true,
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: () =>
        import('../components/UsuariosComponents/Login-Cadastro/LoginRegisterComponent.vue'),
      meta: { requiresGuest: true }, // Requer que o usuário NÃO esteja autenticado
      props: true,
    },
    {
      path: '/login/admin',
      name: 'loginadmin',
      component: () => import('../components/AdminComponents/LoginAdminComponent.vue'),
      props: true,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue'),
    }
  ],
});

// Middleware de proteção de rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Token de autenticação

  let userRole = null;

  if (token) {
    try {
      // Decodifica o token e extrai o papel do usuário
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role; // Extrai o papel (role) do payload do token
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      localStorage.removeItem('token'); // Remove tokens inválidos
      sessionStorage.removeItem('token');
      return next({ name: 'loginadmin' });
    }
  }

  console.log('Token:', token);
  console.log('UserRole:', userRole);

  // Verificar se a rota requer autenticação
  if (to.meta.requiresAuth) {
    if (!token) {
      console.warn('Acesso negado. Redirecionando para login.');
      return next({ name: 'loginadmin' });
    }

    // Verificar se a rota exige que o usuário seja admin
    if (to.meta.isAdmin && userRole !== 'Admin') {
      console.warn('Acesso negado. Usuário não é admin.');
      return next({ name: 'home' });
    }
  }

  // Bloquear acesso à rota `/usuario` para usuários já logados
  if (to.name === 'usuario' && token) {
    console.warn('Usuário já autenticado. Redirecionando para perfil.');
    return next({ name: 'perfil' }); // Redireciona para o perfil ou para outra página desejada
  }

  // Bloquear acesso à rota de login/registro para usuários logados
  if (to.meta.requiresGuest && token) {
    return next({ name: 'home' }); // Redireciona usuários logados para a home ou outra página
  }

  next(); // Prosseguir para a rota solicitada
});

export default router;
