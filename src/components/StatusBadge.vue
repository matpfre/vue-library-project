<script setup>
defineProps({ status: String })
</script>
<template>
  <span
    class="badge"
    :class="{
      danger: status === 'Atrasado' || status === 'Com atraso',
      warning: status === 'Vence em breve' || status === 'Emprestado',
    }"
    ><i />{{ status }}</span
  >
</template>
