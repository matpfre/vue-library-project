<script setup>
import { ref } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'
import Modal from './components/Modal.vue'
const menu = ref(false),
  dialog = ref('')
</script>
<template>
  <div class="app-shell">
    <AppSidebar
      :open="menu"
      @close="menu = false"
      @help="dialog = 'Ajuda'"
      @settings="dialog = 'Configurações'"
    />
    <main class="main-content">
      <AppHeader :title="$route.meta.title" @menu="menu = true" /><RouterView /><Modal
        v-if="dialog"
        :title="dialog"
        @close="dialog = ''"
        ><template v-if="dialog === 'Ajuda'"
          ><p>
            Encontre livros pelo título, autor ou ISBN no Catálogo. Entre como bibliotecário para
            cadastrar livros e usuários.
          </p>
          <p>
            Na página de um livro, selecione Emprestar e escolha o leitor. Registre a devolução em
            Empréstimos.
          </p>
          <p>
            O prazo é de 7 dias, com limite de 3 empréstimos ativos por usuário. Atrasos impedem
            novos empréstimos.
          </p></template
        ><template v-else
          ><p><strong>Estante Viva · versão 1.0</strong></p>
          <p>Os dados são salvos automaticamente neste navegador.</p>
          <dl>
            <div>
              <dt>Prazo de empréstimo</dt>
              <dd>7 dias</dd>
            </div>
            <div>
              <dt>Limite por usuário</dt>
              <dd>3 empréstimos ativos</dd>
            </div>
            <div>
              <dt>Idioma</dt>
              <dd>Português do Brasil</dd>
            </div>
          </dl></template
        ></Modal
      >
    </main>
  </div>
</template>
