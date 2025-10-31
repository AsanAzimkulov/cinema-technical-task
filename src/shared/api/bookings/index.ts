import { apiInstance } from '@/shared/api/instance'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Booking, PaymentResponse } from '@/shared/api/types'

export function fetchUserBookings() {
  return apiInstance.get<Booking[]>('/me/bookings').then(r => r.data)
}

export function useUserBookingsQuery() {
  return useQuery({ queryKey: ['bookings'], queryFn: fetchUserBookings })
}

export function usePayBookingMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bookingId: string): Promise<PaymentResponse> => {
      const response = await apiInstance.post<PaymentResponse>(`/bookings/${bookingId}/payments`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })
}
