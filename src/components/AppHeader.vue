<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useLibrary, loanStatus } from '../stores/library'
defineProps({ title: String })
defineEmits(['menu'])
const library = useLibrary(),
  dropdown = ref(false),
  notifications = ref(false)
</script>
<template>
  <header class="app-header">
    <div class="header-title">
      <button class="icon-button mobile-menu" aria-label="Abrir menu" @click="$emit('menu')">
        <AppIcon name="menu" />
      </button>
      <div>
        <span class="eyebrow">ESTANTE VIVA</span>
        <h1>{{ title }}</h1>
      </div>
    </div>
    <div class="header-actions">
      <div class="profile-wrap">
        <button class="profile" @click="dropdown = !dropdown" :aria-expanded="dropdown">
          <span class="avatar">{{ library.session?.name?.slice(0, 1) || 'L' }}<i /></span
          ><span
            ><strong>{{ library.session?.name || 'Olá, leitor' }}</strong
            ><small>{{
              library.session?.role === 'admin' ? 'Bibliotecária' : 'Boas leituras por aqui'
            }}</small></span
          ><AppIcon name="chevron" :size="16" />
        </button>
        <div v-if="dropdown" class="popover">
          <RouterLink to="/login" @click="dropdown = false">{{
            library.session ? 'Trocar de conta' : 'Entrar na Estante Viva'
          }}</RouterLink
          ><RouterLink to="/emprestimos" @click="dropdown = false">Meus empréstimos</RouterLink>
        </div>
      </div>
      <div class="notification-wrap">
        <button
          class="notification icon-button"
          aria-label="Notificações"
          @click="notifications = !notifications"
        >
          <AppIcon name="bell" /><i
            v-if="library.active.some((l) => loanStatus(l) === 'Atrasado')"
          />
        </button>
        <div v-if="notifications" class="popover">
          <strong>Notificações</strong>
          <p>
            {{
              library.active.filter(
                (l) =>
                  loanStatus(l) === 'Atrasado' &&
                  (library.session?.role === 'admin' || l.userId === library.session?.id),
              ).length
            }}
            empréstimo(s) atrasado(s).
          </p>
          <RouterLink to="/emprestimos" @click="notifications = false"
            >Acompanhar empréstimos →</RouterLink
          >
        </div>
      </div>
    </div>
  </header>
</template>
