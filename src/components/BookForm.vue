<script setup>
import { reactive } from 'vue'
import { useLibrary } from '../stores/library'
const props = defineProps({ book: Object })
const emit = defineEmits(['save'])
const library = useLibrary()
const form = reactive({
  ...props.book,
  title: props.book?.title || '',
  author: props.book?.author || '',
  isbn: props.book?.isbn || '',
  category: props.book?.category || '',
  year: props.book?.year || '',
  copies: props.book?.copies ?? 1,
})
const errors = reactive({})
function submit() {
  Object.keys(errors).forEach((k) => delete errors[k])
  for (const key of ['title', 'author', 'category'])
    if (!form[key].trim()) errors[key] = 'Campo obrigatório.'
  if (!/^(\d{10}|\d{13})$/.test(form.isbn)) errors.isbn = 'Informe um ISBN de 10 ou 13 dígitos.'
  if (library.books.some((b) => b.isbn === form.isbn && b.id !== form.id))
    errors.isbn = 'Este ISBN já está cadastrado.'
  if (!Number.isInteger(Number(form.year)) || form.year < 1 || form.year > new Date().getFullYear())
    errors.year = 'Informe um ano válido.'
  const borrowed = library.active.filter((l) => l.bookId === form.id).length
  if (!Number.isInteger(Number(form.copies)) || Number(form.copies) < Math.max(1, borrowed))
    errors.copies = `Informe ao menos ${Math.max(1, borrowed)} exemplar(es).`
  if (!Object.keys(errors).length)
    emit('save', {
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category.trim(),
      year: Number(form.year),
      copies: Number(form.copies),
    })
}
const labels = {
  title: 'Título',
  author: 'Autor',
  isbn: 'ISBN',
  category: 'Categoria',
  year: 'Ano de publicação',
  copies: 'Quantidade de exemplares',
}
</script>
<template>
  <form class="form-grid" @submit.prevent="submit" novalidate>
    <label v-for="(label, key) in labels" :key="key"
      >{{ label
      }}<input
        v-model="form[key]"
        :type="['year', 'copies'].includes(key) ? 'number' : 'text'"
        :aria-invalid="!!errors[key]"
        :list="key === 'category' ? 'categories' : undefined"
      /><small v-if="errors[key]" class="error">{{ errors[key] }}</small></label
    ><datalist id="categories">
      <option v-for="category in library.categories" :key="category">
        {{ category }}
      </option></datalist
    ><button class="primary form-submit">Salvar livro</button>
  </form>
</template>
