import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Введите имя пользователя'),
  password: z.string().min(1, 'Введите пароль')
})

export const registerSchema = z.object({
  username: z.string()
    .min(8, 'Имя пользователя должно содержать минимум 8 символов'),
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать минимум 1 заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать минимум 1 цифру'),
  passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Пароли не совпадают',
  path: ['passwordConfirmation']
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
