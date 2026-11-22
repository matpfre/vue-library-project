<script setup>
defineProps({ title: String, subtitle: String, action: String })
defineEmits(['action'])
</script>
<template>
  <div class="section-header">
    <div>
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <button v-if="action" class="text-button" @click="$emit('action')">
      {{ action }} <span>↗</span></button
    ><slot />
  </div>
</template>
