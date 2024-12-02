import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import { useUserStore } from '../stores/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/order/index.vue'),
        meta: { title: '订单管理' }
      },
      {
        path: 'books',
        name: 'Books',
        component: () => import('../views/books/index.vue'),
        meta: { title: '图书管理' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/profile/index.vue'),
        meta: { title: '个人管理' }
      },
      {
        path: 'storage',
        name: 'Storage',
        component: () => import('../views/storage/index.vue'),
        meta: { title: '库存管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 不需要登录的路由
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  
  if (authRequired && !userStore.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router 