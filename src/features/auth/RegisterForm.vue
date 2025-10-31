<template>
  <Card class="w-full max-w-md mx-auto">
    <template #header>
      <h2 class="text-xl font-semibold text-gray-900">Регистрация</h2>
    </template>
    
    <form @submit.prevent="onSubmit" class="space-y-6">
      <FormInput
        v-model="username"
        label="Имя пользователя"
        placeholder="Введите имя пользователя"
        :error="errors?.username as string | undefined"
        message="Минимум 8 символов"
        required
      />
      
      <FormInput
        v-model="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        :error="errors?.password as string | undefined"
        message="Минимум 8 символов, 1 заглавная буква и 1 цифра"
        required
      />
      
      <FormInput
        v-model="passwordConfirmation"
        type="password"
        label="Подтверждение пароля"
        placeholder="Подтвердите пароль"
        :error="errors?.passwordConfirmation as string | undefined"
        required
      />
      
      <div v-if="errorMessage" class="p-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
        {{ errorMessage }}
      </div>
      
      <Button
        type="submit"
        :loading="isLoading"
        :disabled="!isFormValid"
        full-width
        class="w-full"
      >
        Зарегистрироваться
      </Button>
    </form>
    
    <template #footer>
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Уже есть аккаунт?
          <button
            type="button"
            class="font-medium text-blue-600 hover:text-blue-500"
            @click="$emit('switchToLogin')"
          >
            Войти
          </button>
        </p>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterFormData } from '~/shared/lib/validation'
import { useAuthStore } from '~/shared/store/auth'
import Card from '~/shared/ui/Card/Card.vue'
import Button from '~/shared/ui/Button/Button.vue'
import FormInput from '~/shared/ui/Form/FormInput.vue'

const authStore = useAuthStore()
const errorMessage = ref('')

const { handleSubmit, defineField, errors, values, meta } = useForm({
  validationSchema: toTypedSchema(registerSchema)
})

const [username] = defineField('username')
const [password] = defineField('password')
const [passwordConfirmation] = defineField('passwordConfirmation')

const isLoading = computed(() => authStore.isLoading)
const isFormValid = computed(() => {
  return meta.value.valid && !!values.username && !!values.password && !!values.passwordConfirmation
})

const handleFormSubmit = async (formValues: RegisterFormData) => {
  try {
    errorMessage.value = ''
    await authStore.register(formValues.username, formValues.password)
    await navigateTo('/my-tickets')
  } catch (error: any) {
    errorMessage.value = error.message || 'Ошибка при регистрации. Попробуйте еще раз.'
  }
}

const onSubmit = handleSubmit(handleFormSubmit)

defineEmits<{
  switchToLogin: []
}>()
</script>
