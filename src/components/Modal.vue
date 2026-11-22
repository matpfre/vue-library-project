<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
defineOptions({ name: 'AppModal' })
defineProps({ title: String })
const emit = defineEmits(['close'])
const box = ref(null)
let previous
function key(event) {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'Tab') {
    const items = box.value.querySelectorAll('button,input,select,textarea,[tabindex="0"]')
    const first = items[0],
      last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}
onMounted(() => {
  previous = document.activeElement
  box.value.focus()
  document.addEventListener('keydown', key)
})
onUnmounted(() => {
  document.removeEventListener('keydown', key)
  previous?.focus()
})
</script>
<template>
  <Teleport to="body"
    ><div class="modal-backdrop" @click.self="emit('close')">
      <section
        ref="box"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
      >
        <div class="section-header">
          <h2>{{ title }}</h2>
          <button class="icon-button" aria-label="Fechar" @click="emit('close')">
            <AppIcon name="close" />
          </button>
        </div>
        <slot />
      </section></div
  ></Teleport>
</template>
