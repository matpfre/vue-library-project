import { createRouter, createWebHistory } from 'vue-router'
import { useLibrary } from '../stores/library'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/CatalogView.vue'), meta: { title: 'Catálogo' } },
    {
      path: '/categorias',
      component: () => import('../views/CategoriesView.vue'),
      meta: { title: 'Categorias' },
    },
    {
      path: '/livros/:id',
      component: () => import('../views/BookView.vue'),
      meta: { title: 'Detalhes do livro' },
    },
    {
      path: '/acervo',
      component: () => import('../views/InventoryView.vue'),
      meta: { title: 'Acervo', admin: true },
    },
    {
      path: '/usuarios',
      component: () => import('../views/UsersView.vue'),
      meta: { title: 'Usuários', admin: true },
    },
    {
      path: '/emprestimos',
      component: () => import('../views/LoansView.vue'),
      meta: { title: 'Empréstimos', auth: true },
    },
    {
      path: '/painel',
      component: () => import('../views/DashboardView.vue'),
      meta: { title: 'Painel', admin: true },
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: 'Bem-vindo' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
router.beforeEach((to) => {
  const library = useLibrary()
  if ((to.meta.admin || to.meta.auth) && !library.session)
    return { path: '/login', query: { redirect: to.fullPath } }
  if (to.meta.admin && library.session?.role !== 'admin') return '/emprestimos'
  document.title = to.meta.title + ' · Estante Viva'
})
export default router
