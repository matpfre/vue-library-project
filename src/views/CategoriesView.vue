<script setup>
import { useLibrary } from '../stores/library'
import AppIcon from '../components/AppIcon.vue'
const library = useLibrary()
</script>
<template>
  <div class="page-intro">
    <span class="eyebrow coral-text">CADA INTERESSE, UM NOVO CAMINHO</span>
    <h2>Um universo de possibilidades.</h2>
    <p>Explore histórias e conhecimentos por categoria.</p>
  </div>
  <div class="category-grid">
    <RouterLink
      v-for="(category, index) in library.categories"
      :key="category"
      :to="{ path: '/', query: { categoria: category } }"
      class="category-card"
      ><span class="category-number">0{{ index + 1 }}</span
      ><AppIcon :name="index % 2 ? 'stack' : 'book'" :size="34" />
      <h3>{{ category }}</h3>
      <p>
        {{ library.books.filter((b) => b.category === category).length }} livros no acervo
        <span>↗</span>
      </p></RouterLink
    >
  </div>
</template>
