<script setup>
import AppIcon from './AppIcon.vue'
defineProps({ label: String, value: Number, icon: String })
</script>
<template>
  <div class="stat-card">
    <span class="stat-icon"><AppIcon :name="icon" /></span><span>{{ label }}</span
    ><strong>{{ value }}</strong>
  </div>
</template>
