<script setup>
import BookCover from './BookCover.vue'
import StatusBadge from './StatusBadge.vue'
import { useLibrary } from '../stores/library'
defineProps({ book: Object })
const library = useLibrary()
</script>
<template>
  <RouterLink :to="'/livros/' + book.id" class="book-card"
    ><BookCover :book="book" />
    <div class="book-meta">
      <span>{{ book.category }}</span>
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
      <StatusBadge :status="library.status(book)" /></div
  ></RouterLink>
</template>
