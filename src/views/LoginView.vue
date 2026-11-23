<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLibrary } from '../stores/library'
import AppIcon from '../components/AppIcon.vue'
const library = useLibrary(),
  route = useRoute(),
  router = useRouter(),
  email = ref(''),
  password = ref(''),
  error = ref('')
function submit() {
  try {
    library.login(email.value.trim().toLowerCase(), password.value)
    const requested = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.push(library.session.role === 'admin' ? requested : '/emprestimos')
  } catch (e) {
    error.value = e.message
  }
}
</script>
<template>
  <div class="login-layout">
    <div class="login-story">
      <AppIcon name="book" :size="50" /><span class="eyebrow">BEM-VINDO À ESTANTE VIVA</span>
      <h2>Conecte-se ao<br />seu próximo<br /><em>capítulo.</em></h2>
      <p>Um espaço para descobrir, compartilhar<br />e transformar através da leitura.</p>
    </div>
    <form class="login-form" @submit.prevent="submit">
      <span class="eyebrow coral-text">QUE BOM TER VOCÊ AQUI</span>
      <h2>Entre na Estante Viva</h2>
      <p>Acesse sua conta para continuar.</p>
      <label
        >E-mail<input
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          required
          autocomplete="username" /></label
      ><label
        >Senha<input
          v-model="password"
          type="password"
          placeholder="Sua senha"
          required
          autocomplete="current-password"
      /></label>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button class="primary">Entrar <span>↗</span></button>
      <div class="demo-note">
        <strong>Contas de demonstração</strong>
        <p>
          Bibliotecária: admin@biblioteca.com<br />Leitora: ana@biblioteca.com<br />Senha para
          ambas: <b>123456</b>
        </p>
      </div>
    </form>
  </div>
</template>
