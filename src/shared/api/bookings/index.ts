import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { apiInstance } from '@/shared/api/instance'
import type { Booking, BookingRequest, BookingResponse, PaymentResponse } from '@/shared/api/types'

export const bookingsKeys = {
  me: ['me', 'bookings'] as const
}

export function useMyBookingsQuery() {
  return useQuery({
    queryKey: bookingsKeys.me,
    queryFn: async (): Promise<Booking[]> => {
      const { data } = await apiInstance.get<Booking[]>('/me/bookings')
      return data
    }
  })
}

export function useBookSessionMutation(movieSessionId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: BookingRequest): Promise<BookingResponse> => {
      const { data } = await apiInstance.post<BookingResponse>(`/movieSessions/${movieSessionId}/bookings`, payload)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bookingsKeys.me })
    }
  })
}

export function usePayBookingMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (bookingId: string): Promise<PaymentResponse> => {
      const { data } = await apiInstance.post<PaymentResponse>(`/bookings/${bookingId}/payments`)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bookingsKeys.me })
    }
  })
}


