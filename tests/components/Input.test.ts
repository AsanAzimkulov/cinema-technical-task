import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '~/shared/ui/Input/Input.vue'

describe('Input', () => {
  it('renders with label', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Test Label',
        modelValue: ''
      }
    })
    
    expect(wrapper.find('label').text()).toBe('Test Label')
  })
  
  it('shows required asterisk when required', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Test Label',
        modelValue: '',
        required: true
      }
    })
    
    expect(wrapper.find('label').text()).toContain('*')
  })
  
  it('shows error message', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        error: 'This field is required'
      }
    })
    
    expect(wrapper.find('.text-red-600').text()).toBe('This field is required')
  })
  
  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: ''
      }
    })
    
    const input = wrapper.find('input')
    await input.setValue('test value')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
  })
  
  it('applies error classes when error is present', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        error: 'Error message'
      }
    })
    
    const input = wrapper.find('input')
    expect(input.classes()).toContain('border-red-300')
  })
})
