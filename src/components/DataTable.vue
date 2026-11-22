<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  rows: Array,
  columns: Array,
  searchKeys: { type: Array, default: () => [] },
  placeholder: { default: 'Buscar...' },
})
const query = ref(''),
  page = ref(1),
  sort = ref(''),
  direction = ref(1)
const filtered = computed(() => {
  const rows = props.rows.filter(
    (r) =>
      props.searchKeys.some((k) =>
        String(r[k] ?? '')
          .toLowerCase()
          .includes(query.value.toLowerCase()),
      ) || !query.value,
  )
  return sort.value
    ? [...rows].sort(
        (a, b) =>
          String(a[sort.value]).localeCompare(String(b[sort.value]), 'pt-BR', { numeric: true }) *
          direction.value,
      )
    : rows
})
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 10)))
watch([query, () => props.rows.length], () => (page.value = 1))
function order(key) {
  direction.value = sort.value === key ? -direction.value : 1
  sort.value = key
}
</script>
<template>
  <div class="data-table">
    <input
      v-if="searchKeys.length"
      v-model="query"
      class="table-search"
      :placeholder="placeholder"
      :aria-label="placeholder"
    />
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              <button @click="order(column.key)">{{ column.label }} <span>↕</span></button>
            </th>
            <th v-if="$slots.actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filtered.slice((page - 1) * 10, page * 10)" :key="row.id">
            <td v-for="column in columns" :key="column.key">
              <slot :name="column.key" :row="row">{{ row[column.key] }}</slot>
            </td>
            <td v-if="$slots.actions"><slot name="actions" :row="row" /></td>
          </tr>
          <tr v-if="!filtered.length">
            <td :colspan="columns.length + 1" class="empty">Nenhum registro encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>{{ filtered.length }} registros · Página {{ page }} de {{ pages }}</span>
      <div>
        <button :disabled="page === 1" @click="page--">← Anterior</button
        ><button :disabled="page >= pages" @click="page++">Próxima →</button>
      </div>
    </div>
  </div>
</template>
