import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CartItem } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const count = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  const total = computed(() => {
    return items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
  })

  function addItem(product: Product, quantity: number = 1) {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        ...product,
        quantity
      })
    }
    // Save to localStorage
    saveCart()
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      saveCart()
    }
  }

  function removeItem(productId: string) {
    items.value = items.value.filter(item => item.id !== productId)
    saveCart()
  }

  function clearCart() {
    items.value = []
    saveCart()
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function loadCart() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart)
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
        items.value = []
      }
    }
  }

  // Initialize cart from localStorage on store creation
  loadCart()

  return {
    items,
    loading,
    error,
    count,
    total,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    loadCart
  }
})

export const useCompareStore = defineStore('compare', () => {
  const items = ref<Product[]>([])
  
  const count = computed(() => items.value.length)
  
  function addItem(product: Product) {
    if (!items.value.some(item => item.id === product.id)) {
      items.value.push(product)
      saveCompare()
    }
  }
  
  function removeItem(productId: string) {
    items.value = items.value.filter(item => item.id !== productId)
    saveCompare()
  }
  
  function clearAll() {
    items.value = []
    saveCompare()
  }
  
  function saveCompare() {
    localStorage.setItem('compare', JSON.stringify(items.value))
  }
  
  function loadCompare() {
    const saved = localStorage.getItem('compare')
    if (saved) {
      try {
        items.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse compare list from localStorage', e)
        items.value = []
      }
    }
  }
  
  // Initialize on store creation
  loadCompare()
  
  return {
    items,
    count,
    addItem,
    removeItem,
    clearAll
  }
})