import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema, bookingSchema } from '~/shared/lib/validation'

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const validData = {
        username: 'testuser123',
        password: 'password123'
      }
      
      expect(() => loginSchema.parse(validData)).not.toThrow()
    })
    
    it('rejects short username', () => {
      const invalidData = {
        username: 'test',
        password: 'password123'
      }
      
      expect(() => loginSchema.parse(invalidData)).toThrow()
    })
    
    it('rejects short password', () => {
      const invalidData = {
        username: 'testuser123',
        password: 'pass'
      }
      
      expect(() => loginSchema.parse(invalidData)).toThrow()
    })
  })
  
  describe('registerSchema', () => {
    it('validates correct register data', () => {
      const validData = {
        username: 'testuser123',
        password: 'Password123',
        passwordConfirmation: 'Password123'
      }
      
      expect(() => registerSchema.parse(validData)).not.toThrow()
    })
    
    it('rejects password without uppercase letter', () => {
      const invalidData = {
        username: 'testuser123',
        password: 'password123',
        passwordConfirmation: 'password123'
      }
      
      expect(() => registerSchema.parse(invalidData)).toThrow()
    })
    
    it('rejects password without number', () => {
      const invalidData = {
        username: 'testuser123',
        password: 'Password',
        passwordConfirmation: 'Password'
      }
      
      expect(() => registerSchema.parse(invalidData)).toThrow()
    })
    
    it('rejects mismatched passwords', () => {
      const invalidData = {
        username: 'testuser123',
        password: 'Password123',
        passwordConfirmation: 'Password456'
      }
      
      expect(() => registerSchema.parse(invalidData)).toThrow()
    })
  })
  
  describe('bookingSchema', () => {
    it('validates correct booking data', () => {
      const validData = {
        seats: [
          { rowNumber: 1, seatNumber: 1 },
          { rowNumber: 1, seatNumber: 2 }
        ]
      }
      
      expect(() => bookingSchema.parse(validData)).not.toThrow()
    })
    
    it('rejects empty seats array', () => {
      const invalidData = {
        seats: []
      }
      
      expect(() => bookingSchema.parse(invalidData)).toThrow()
    })
    
    it('rejects invalid seat data', () => {
      const invalidData = {
        seats: [
          { rowNumber: 0, seatNumber: 1 }
        ]
      }
      
      expect(() => bookingSchema.parse(invalidData)).toThrow()
    })
  })
})
