<script setup>
import { computed, ref } from 'vue'
import { useLibrary, loanStatus } from '../stores/library'
import DataTable from '../components/DataTable.vue'
import Modal from '../components/Modal.vue'
import UserForm from '../components/UserForm.vue'
import StatusBadge from '../components/StatusBadge.vue'
const library = useLibrary(),
  modal = ref(false)
const rows = computed(() =>
  library.users.map((u) => ({
    ...u,
    count: library.userLoans(u.id).length,
    status: library.userLoans(u.id).some((l) => loanStatus(l) === 'Atrasado')
      ? 'Com atraso'
      : 'Regular',
  })),
)
function save(user) {
  library.users.push({ ...user, id: crypto.randomUUID() })
  modal.value = false
}
</script>
<template>
  <div class="section-header page-intro">
    <div>
      <span class="eyebrow coral-text">NOSSA COMUNIDADE DE LEITORES</span>
      <h2>Conhecimento é para todos.</h2>
      <p>Gerencie os usuários da biblioteca.</p>
    </div>
    <button class="primary" @click="modal = true">+ Novo usuário</button>
  </div>
  <DataTable
    :rows="rows"
    :columns="[
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'type', label: 'Tipo' },
      { key: 'count', label: 'Empréstimos ativos' },
      { key: 'status', label: 'Situação' },
    ]"
    :search-keys="['name']"
    placeholder="Buscar por nome"
    ><template #status="{ row }"><StatusBadge :status="row.status" /></template></DataTable
  ><Modal v-if="modal" title="Novo usuário" @close="modal = false"><UserForm @save="save" /></Modal>
</template>
