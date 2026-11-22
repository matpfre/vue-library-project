import { createRouter, createWebHistory } from 'vue-router'
import { useLibrary } from '../stores/library'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/CatalogView.vue'), meta: { title: 'Catálogo' } },
    { path: '/login', component: () => import('../views/LoginView.vue'), meta: { title: 'Bem-vindo' } },
    { path: '/categorias', component: () => import('../views/CategoriesView.vue'), meta: { title: 'Categorias' } },
    { path: '/acervo', component: () => import('../views/InventoryView.vue'), meta: { title: 'Acervo', admin: true } },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
router.beforeEach((to) => {
  const library = useLibrary()
  if ((to.meta.admin || to.meta.auth) && !library.session)
    return { path: '/login', query: { redirect: to.fullPath } }
  if (to.meta.admin && library.session?.role !== 'admin') return '/emprestimos'
  document.title = to.meta.title + ' · Biblioteca'
})
export default router
