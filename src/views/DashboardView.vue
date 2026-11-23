<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useLibrary, dateLabel, loanStatus } from '../stores/library'
import StatCard from '../components/StatCard.vue'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
const library = useLibrary(),
  canvas = ref(null)
let chart
const loansByCategory = computed(() => {
  const categoriesByBook = new Map(library.books.map((book) => [book.id, book.category]))
  const counts = new Map()

  for (const loan of library.active) {
    const category = categoriesByBook.get(loan.bookId)
    if (category === undefined) continue
    counts.set(category, (counts.get(category) ?? 0) + 1)
  }

  return counts
})
const upcoming = computed(() =>
  library.active
    .filter((l) => l.dueAt >= Date.now() && l.dueAt <= Date.now() + 7 * 86400000)
    .map((l) => ({
      ...l,
      book: library.books.find((b) => b.id === l.bookId)?.title,
      user: library.users.find((u) => u.id === l.userId)?.name,
      due: dateLabel(l.dueAt),
      status: loanStatus(l),
    })),
)
function draw() {
  chart?.destroy()
  chart = undefined
  if (!canvas.value) return

  const styles = getComputedStyle(document.documentElement)
  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: [...loansByCategory.value.keys()],
      datasets: [
        {
          label: 'Empréstimos',
          data: [...loansByCategory.value.values()],
          backgroundColor: styles.getPropertyValue('--coral').trim(),
          borderRadius: 7,
          maxBarThickness: 48,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
        x: { grid: { display: false } },
      },
    },
  })
}
onMounted(draw)
watch(loansByCategory, draw, { flush: 'post' })
onUnmounted(() => chart?.destroy())
</script>
<template>
  <div class="page-intro">
    <span class="eyebrow coral-text">UM OLHAR SOBRE A BIBLIOTECA</span>
    <h2>Conhecimento em movimento.</h2>
    <p>Os principais números do seu acervo, em um só lugar.</p>
  </div>
  <div class="stats-grid">
    <StatCard label="Títulos no acervo" :value="library.books.length" icon="book" /><StatCard
      label="Livros emprestados"
      :value="library.active.length"
      icon="loan"
    /><StatCard
      label="Empréstimos atrasados"
      :value="library.active.filter((l) => loanStatus(l) === 'Atrasado').length"
      icon="clock"
    /><StatCard label="Usuários cadastrados" :value="library.users.length" icon="users" />
  </div>
  <section class="chart-panel">
    <h2>Empréstimos por categoria</h2>
    <p v-if="!loansByCategory.size">Nenhum livro emprestado no momento.</p>
    <div v-else class="chart-container">
      <canvas ref="canvas" aria-label="Gráfico de empréstimos por categoria" role="img" />
    </div>
  </section>
  <h2 class="spaced-title">Devoluções nos próximos 7 dias</h2>
  <DataTable
    :rows="upcoming"
    :columns="[
      { key: 'book', label: 'Livro' },
      { key: 'user', label: 'Usuário' },
      { key: 'due', label: 'Devolução' },
      { key: 'status', label: 'Status' },
    ]"
    ><template #status="{ row }"><StatusBadge :status="row.status" /></template
  ></DataTable>
</template>
