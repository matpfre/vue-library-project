<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { useLibrary } from '../stores/library'
import { useRouter } from 'vue-router'
defineProps({ open: Boolean })
const emit = defineEmits(['close', 'help', 'settings'])
const library = useLibrary(),
  router = useRouter()
const links = [
  ['/', 'Catálogo', 'book'],
  ['/categorias', 'Categorias', 'grid'],
  ['/acervo', 'Acervo', 'stack'],
  ['/emprestimos', 'Empréstimos', 'loan'],
  ['/usuarios', 'Usuários', 'users'],
  ['/painel', 'Painel', 'chart'],
]
const visibleLinks = computed(() =>
  links.filter(([path]) => !router.resolve(path).meta.admin || library.session?.role === 'admin'),
)
function logout() {
  library.session = null
  emit('close')
  router.push('/login')
}
</script>
<template>
  <div v-if="open" class="sidebar-overlay" @click="emit('close')" />
  <aside class="sidebar" :class="{ open }">
    <RouterLink to="/" class="brand"
      ><AppIcon name="book" :size="29" />BIBLIOTECA<span /></RouterLink
    ><span class="menu-label">MENU PRINCIPAL</span>
    <nav>
      <RouterLink
        v-for="[path, label, icon] in visibleLinks"
        :key="path"
        :to="path"
        :class="{ active: $route.path === path }"
        @click="emit('close')"
        ><AppIcon :name="icon" /><span>{{ label }}</span
        ><span v-if="label === 'Catálogo'" class="nav-dot">•</span></RouterLink
      >
    </nav>
    <div class="sidebar-secondary">
      <button
        @click="emit('settings'); emit('close')"
      >
        <AppIcon name="settings" />Configurações</button
      ><button
        @click="emit('help'); emit('close')"
      >
        <AppIcon name="help" />Ajuda</button
      ><button @click="logout">
        <AppIcon name="logout" />{{ library.session ? 'Sair' : 'Entrar' }}
      </button>
    </div>
    <div class="sidebar-bottom">
      <div class="library-mark"><AppIcon name="book" :size="35" /></div>
      <strong>BOOK LIBRARY</strong><span>Um mundo em cada página.</span
      ><small>FEITO PARA QUEM AMA LER</small>
    </div>
  </aside>
</template>
