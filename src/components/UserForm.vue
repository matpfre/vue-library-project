<script setup>
import { reactive } from 'vue'
import { useLibrary } from '../stores/library'
const emit = defineEmits(['save'])
const library = useLibrary()
const form = reactive({ name: '', email: '', type: 'Aluno' }),
  errors = reactive({})
function submit() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim()) errors.name = 'Informe o nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Informe um e-mail válido.'
  if (library.users.some((u) => u.email === form.email) || form.email === 'admin@biblioteca.com')
    errors.email = 'Este e-mail já está cadastrado.'
  if (!Object.keys(errors).length) emit('save', { ...form, name: form.name.trim() })
}
</script>
<template>
  <form class="form-grid" @submit.prevent="submit" novalidate>
    <label
      >Nome completo<input v-model="form.name" /><small class="error">{{
        errors.name
      }}</small></label
    ><label
      >E-mail<input v-model="form.email" type="email" /><small class="error">{{
        errors.email
      }}</small></label
    ><label
      >Tipo de usuário<select v-model="form.type">
        <option>Aluno</option>
        <option>Professor</option>
      </select></label
    ><button class="primary form-submit">Cadastrar usuário</button>
  </form>
</template>
