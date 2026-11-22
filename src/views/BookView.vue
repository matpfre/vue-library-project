<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLibrary, dateLabel, loanStatus } from '../stores/library'
import BookCover from '../components/BookCover.vue'
import StatusBadge from '../components/StatusBadge.vue'
import Modal from '../components/Modal.vue'
import DataTable from '../components/DataTable.vue'
const library = useLibrary(),
  route = useRoute(),
  modal = ref(false),
  userId = ref(''),
  error = ref(''),
  success = ref('')
const book = computed(() => library.books.find((b) => b.id === route.params.id)),
  history = computed(() =>
    library.loans
      .filter((l) => l.bookId === book.value?.id)
      .map((l) => ({
        ...l,
        user: library.users.find((u) => u.id === l.userId)?.name || 'Usuário removido',
        date: dateLabel(l.createdAt),
        due: dateLabel(l.dueAt),
        status: l.returnedAt ? 'Devolvido' : loanStatus(l),
      })),
  )
function lend() {
  try {
    library.lend(book.value.id, userId.value)
    modal.value = false
    success.value = 'Empréstimo registrado. Prazo de devolução: 7 dias.'
    error.value = ''
  } catch (e) {
    error.value = e.message
  }
}
</script>
<template>
  <RouterLink to="/" class="back-link">← Voltar ao catálogo</RouterLink
  ><template v-if="book"
    ><div class="book-detail">
      <BookCover :book="book" />
      <div>
        <span class="eyebrow coral-text">{{ book.category }}</span>
        <h2>{{ book.title }}</h2>
        <p class="detail-author">por {{ book.author }}</p>
        <StatusBadge :status="library.status(book)" />
        <dl>
          <div>
            <dt>ISBN</dt>
            <dd>{{ book.isbn }}</dd>
          </div>
          <div>
            <dt>Ano de publicação</dt>
            <dd>{{ book.year }}</dd>
          </div>
          <div>
            <dt>Exemplares disponíveis</dt>
            <dd>{{ library.available(book) }} de {{ book.copies }}</dd>
          </div>
          <div>
            <dt>Prazo de empréstimo</dt>
            <dd>7 dias</dd>
          </div>
        </dl>
        <button
          v-if="library.session?.role === 'admin'"
          class="primary"
          :disabled="library.available(book) < 1"
          @click="modal = true"
        >
          Emprestar livro ↗</button
        ><RouterLink v-else to="/login" class="primary inline-button"
          >Entrar como bibliotecário para emprestar</RouterLink
        >
        <p v-if="success" class="success" role="status">{{ success }}</p>
      </div>
    </div>
    <section v-if="library.session?.role === 'admin'">
      <h2 class="spaced-title">Histórico de empréstimos</h2>
      <DataTable
        :rows="history"
        :columns="[
          { key: 'user', label: 'Usuário' },
          { key: 'date', label: 'Empréstimo' },
          { key: 'due', label: 'Prazo' },
          { key: 'status', label: 'Situação' },
        ]"
        ><template #status="{ row }"><StatusBadge :status="row.status" /></template
      ></DataTable>
    </section>
    <Modal v-if="modal" title="Emprestar livro" @close="modal = false"
      ><form class="form-grid" @submit.prevent="lend">
        <p>{{ book.title }} · devolução em 7 dias</p>
        <label
          >Selecione o usuário<select v-model="userId">
            <option value="">Escolha um usuário</option>
            <option v-for="user in library.users" :key="user.id" :value="user.id">
              {{ user.name }} · {{ library.userLoans(user.id).length }}/3 ativos
            </option>
          </select></label
        >
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <button class="primary">Confirmar empréstimo</button>
      </form></Modal
    ></template
  >
  <div v-else class="empty">Livro não encontrado.</div>
</template>
