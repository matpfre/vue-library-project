<script setup>
defineProps({ book: Object })
</script>
<template>
  <div class="book-cover" :class="book.color || 'olive'">
    <span class="cover-top"
      >BIBLIOTECA ESSENCIAL <span>{{ book.edition || '01' }}</span></span
    >
    <div class="cover-art">
      <span class="orbit orbit-one" /><span class="orbit orbit-two" /><span
        class="orbit orbit-three"
      /><span class="art-line" />
    </div>
    <div class="cover-copy">
      <span class="cover-author">{{ book.author }}</span>
      <h3>{{ book.title }}</h3>
      <p>{{ book.subtitle || 'Histórias que transformam.' }}</p>
    </div>
    <span class="cover-bottom">EDIÇÃO DO LEITOR <span>↗</span></span>
  </div>
</template>
