<template>
  <Modal
    :is-open="isOpen"
    :title="isLogin ? 'Вход в систему' : 'Регистрация'"
    @close="$emit('close')"
  >
    <LoginForm
      v-if="isLogin"
      @switch-to-register="isLogin = false"
    />
    <RegisterForm
      v-else
      @switch-to-login="isLogin = true"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '~/shared/ui/Modal/Modal.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

interface Props {
  isOpen: boolean
  initialMode?: 'login' | 'register'
}

const props = withDefaults(defineProps<Props>(), {
  initialMode: 'login'
})

const isLogin = ref(props.initialMode === 'login')

defineEmits<{
  close: []
}>()
</script>
