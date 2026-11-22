<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLibrary } from '../stores/library'
import SearchBar from '../components/SearchBar.vue'
import BookCard from '../components/BookCard.vue'
import SectionHeader from '../components/SectionHeader.vue'
import AppIcon from '../components/AppIcon.vue'
const library = useLibrary(),
  route = useRoute(),
  router = useRouter(),
  status = ref('Todos'),
  grid = ref(null)
const filtered = computed(() =>
  library.books.filter(
    (b) =>
      (!route.query.categoria || b.category === route.query.categoria) &&
      (!route.query.q ||
        [b.title, b.author, b.isbn]
          .join(' ')
          .toLowerCase()
          .includes(String(route.query.q).toLowerCase())) &&
      (status.value === 'Todos' || library.status(b) === status.value),
  ),
)
function search({ query, category }) {
  router.replace({
    path: '/',
    query: { ...(query ? { q: query } : {}), ...(category ? { categoria: category } : {}) },
  })
}
</script>
<template>
  <div class="catalog-intro">
    <div>
      <span class="eyebrow coral-text">EXPLORE. DESCUBRA. TRANSFORME.</span>
      <h2>Seu próximo capítulo<br />começa <span>aqui.</span></h2>
      <p>
        Entre clássicos e novas descobertas, encontre<br class="desktop-break" />
        a sua próxima boa história.
      </p>
      <span class="intro-note"
        ><span class="tiny-line" /> Conhecimento que abre novos caminhos.</span
      >
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="hero-circle" />
      <div class="spark spark-one">✳</div>
      <div class="hero-book hero-book-back">
        <span>HISTÓRIAS<br />QUE FICAM.</span><i />
      </div>
      <div class="hero-book hero-book-front">
        <small>UMA PÁGINA DE CADA VEZ</small><strong>O mundo<br />cabe em<br />um livro.</strong
        ><AppIcon name="book" :size="48" />
      </div>
      <div class="spark spark-two">✧</div>
      <span class="hero-caption">ABRA UM LIVRO. AMPLIE SEU MUNDO.</span>
    </div>
  </div>
  <SearchBar
    :key="String(route.query.categoria || '') + String(route.query.q || '')"
    :query="String(route.query.q || '')"
    :category="String(route.query.categoria || '')"
    @search="search"
  />
  <section class="featured">
    <SectionHeader
      title="Livros em destaque"
      subtitle="Histórias que merecem um lugar na sua lista."
      action="Ver todos"
      @action="grid.scrollIntoView({ behavior: 'smooth' })"
    />
    <div class="book-grid featured-grid">
      <BookCard v-for="book in library.books.slice(0, 4)" :key="book.id" :book="book" />
    </div>
  </section>
  <section ref="grid" class="collection">
    <SectionHeader title="Explore o acervo"
      ><span class="result-count">{{ filtered.length }} livros encontrados</span></SectionHeader
    >
    <div class="collection-tools">
      <div class="status-tabs">
        <button
          v-for="[label, value] in [
            ['Todos', 'Todos'],
            ['Disponíveis', 'Disponível'],
            ['Emprestados', 'Emprestado'],
            ['Atrasados', 'Atrasado'],
          ]"
          :key="value"
          :class="{ selected: status === value }"
          @click="status = value"
        >
          {{ label }}<span v-if="value === 'Todos'">{{ library.books.length }}</span>
        </button>
      </div>
      <span class="catalog-order"><AppIcon name="grid" :size="17" /> Nosso acervo</span>
    </div>
    <div class="book-grid"><BookCard v-for="book in filtered" :key="book.id" :book="book" /></div>
    <div v-if="!filtered.length" class="empty">
      Nenhum livro encontrado. Experimente outra busca.
    </div>
  </section>
  <div class="catalog-footer">
    <AppIcon name="book" :size="18" /><span>Grandes descobertas começam com uma boa leitura.</span
    ><span>BIBLIOTECA · {{ new Date().getFullYear() }}</span>
  </div>
</template>
