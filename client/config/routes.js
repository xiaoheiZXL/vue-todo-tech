export default [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/todo',
    component: () => import('../views/todo/todo.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
