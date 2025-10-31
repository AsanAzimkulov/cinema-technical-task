import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Имя пользователя обязательно')
    .min(8, 'Имя пользователя должно содержать минимум 8 символов'),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(8, 'Пароль должен содержать минимум 8 символов')
})

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Имя пользователя обязательно')
    .min(8, 'Имя пользователя должно содержать минимум 8 символов'),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, 'Пароль должен содержать минимум 1 заглавную букву и 1 цифру'),
  passwordConfirmation: z
    .string()
    .min(1, 'Подтверждение пароля обязательно')
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Пароли не совпадают',
  path: ['passwordConfirmation']
})

export const bookingSchema = z.object({
  seats: z
    .array(z.object({
      rowNumber: z.number().min(1),
      seatNumber: z.number().min(1)
    }))
    .min(1, 'Выберите хотя бы одно место')
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type BookingFormData = z.infer<typeof bookingSchema>
