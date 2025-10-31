import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'

// Mock Nuxt composables
global.defineNuxtPlugin = jest.fn()
global.useHead = jest.fn()
global.useLazyAsyncData = jest.fn()
global.navigateTo = jest.fn()
global.process = { client: true } as any

// Setup Pinia for tests
const pinia = createPinia()
config.global.plugins = [pinia]

// Mock fetch
global.fetch = jest.fn()

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  },
  writable: true
})
