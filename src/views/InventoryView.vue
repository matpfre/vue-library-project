<script setup>
import { ref } from 'vue'
import { useLibrary } from '../stores/library'
import DataTable from '../components/DataTable.vue'
import Modal from '../components/Modal.vue'
import BookForm from '../components/BookForm.vue'
import StatusBadge from '../components/StatusBadge.vue'
const library = useLibrary(),
  modal = ref(false),
  editing = ref(null),
  deleting = ref(null),
  error = ref('')
function save(book) {
  if (book.id) {
    const index = library.books.findIndex((b) => b.id === book.id)
    library.books[index] = book
  } else library.books.push({ ...book, id: crypto.randomUUID(), color: 'olive' })
  modal.value = false
}
function remove() {
  try {
    library.removeBook(deleting.value.id)
    deleting.value = null
    error.value = ''
  } catch (e) {
    error.value = e.message
  }
}
</script>
<template>
  <div class="section-header page-intro">
    <div>
      <span class="eyebrow coral-text">ORGANIZAR PARA COMPARTILHAR</span>
      <h2>Gestão do acervo</h2>
      <p>Cuide dos livros que abrem novos mundos.</p>
    </div>
    <button
      class="primary"
      @click="editing = null; modal = true"
    >
      + Novo livro
    </button>
  </div>
  <DataTable
    :rows="library.books"
    :columns="[
      { key: 'title', label: 'Livro' },
      { key: 'author', label: 'Autor' },
      { key: 'category', label: 'Categoria' },
      { key: 'copies', label: 'Exemplares' },
      { key: 'status', label: 'Status' },
    ]"
    :search-keys="['title', 'author', 'isbn']"
    placeholder="Buscar por título, autor ou ISBN"
    ><template #title="{ row }"
      ><RouterLink :to="'/livros/' + row.id" class="table-book">{{
        row.title
      }}</RouterLink></template
    ><template #status="{ row }"><StatusBadge :status="library.status(row)" /></template
    ><template #actions="{ row }"
      ><div class="row-actions">
        <button
          @click="editing = row; modal = true"
        >
          Editar</button
        ><button
          class="delete-button"
          @click="deleting = row; error = ''"
        >
          Excluir
        </button>
      </div></template
    ></DataTable
  ><Modal v-if="modal" :title="editing ? 'Editar livro' : 'Novo livro'" @close="modal = false"
    ><BookForm :book="editing" @save="save" /></Modal
  ><Modal v-if="deleting" title="Excluir livro" @close="deleting = null"
    ><p>Deseja excluir “{{ deleting.title }}” do acervo?</p>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <div class="modal-actions">
      <button class="secondary" @click="deleting = null">Cancelar</button
      ><button class="primary" @click="remove">Confirmar exclusão</button>
    </div></Modal
  >
</template>
