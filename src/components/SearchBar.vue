<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useLibrary } from '../stores/library'
const props = defineProps({ query: String, category: String })
const emit = defineEmits(['search'])
const text = ref(props.query || '')
const selected = ref(props.category || '')
const library = useLibrary()
</script>
<template>
  <form class="search-bar" @submit.prevent="emit('search', { query: text, category: selected })">
    <div class="category-select">
      <AppIcon name="grid" :size="18" /><select v-model="selected" aria-label="Categoria">
        <option value="">Todas as categorias</option>
        <option v-for="category in library.categories" :key="category">{{ category }}</option>
      </select>
    </div>
    <div class="search-input">
      <AppIcon name="search" /><input
        v-model="text"
        placeholder="Busque por título, autor ou ISBN"
        aria-label="Buscar livros"
      />
    </div>
    <button class="primary"><AppIcon name="search" :size="18" />Buscar</button>
  </form>
</template>
