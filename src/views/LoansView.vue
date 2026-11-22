<script setup>
import { computed, ref } from 'vue'
import { useLibrary, dateLabel, loanStatus } from '../stores/library'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
const library = useLibrary(),
  filter = ref('Todos'),
  message = ref('')
const rows = computed(() =>
  library.active
    .filter((l) => library.session?.role === 'admin' || l.userId === library.session?.id)
    .map((l) => ({
      ...l,
      user: library.users.find((u) => u.id === l.userId)?.name,
      book: library.books.find((b) => b.id === l.bookId)?.title,
      date: dateLabel(l.createdAt),
      due: dateLabel(l.dueAt),
      status: loanStatus(l),
    }))
    .filter((l) => filter.value === 'Todos' || l.status === filter.value),
)
function returnBook(id) {
  library.loans.find((l) => l.id === id).returnedAt = Date.now()
  message.value = 'Devolução registrada. O exemplar está disponível novamente.'
}
</script>
<template>
  <div class="page-intro">
    <span class="eyebrow coral-text">HISTÓRIAS EM CIRCULAÇÃO</span>
    <h2>
      {{ library.session?.role === 'admin' ? 'Acompanhe cada capítulo.' : 'Seus empréstimos' }}
    </h2>
    <p>Um bom livro sempre tem data para voltar.</p>
  </div>
  <div class="status-tabs loan-tabs">
    <button
      v-for="status in ['Todos', 'No prazo', 'Vence em breve', 'Atrasado']"
      :key="status"
      :class="{ selected: filter === status }"
      @click="filter = status"
    >
      {{ status }}
    </button>
  </div>
  <p v-if="message" class="success" role="status">{{ message }}</p>
  <DataTable
    :rows="rows"
    :columns="[
      { key: 'user', label: 'Usuário' },
      { key: 'book', label: 'Livro' },
      { key: 'date', label: 'Empréstimo' },
      { key: 'due', label: 'Devolução prevista' },
      { key: 'status', label: 'Status' },
    ]"
    ><template #status="{ row }"><StatusBadge :status="row.status" /></template
    ><template v-if="library.session?.role === 'admin'" #actions="{ row }"
      ><button class="text-button" @click="returnBook(row.id)">
        Registrar devolução ↗
      </button></template
    ></DataTable
  >
</template>
