<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store'

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.total)

function updateQuantity(productId: string, quantity: number) {
  if (quantity < 1) {
    cartStore.removeItem(productId)
  } else {
    cartStore.updateQuantity(productId, quantity)
  }
}

function removeItem(productId: string) {
  cartStore.removeItem(productId)
}



function continueShopping() {
  router.push('/')
}

function proceedToCheckout() {
  router.push('/checkout')
}
</script>

<template>
  <div class="cart-view">
    <div class="container">
      <h1>{{ t('page.cart') }}</h1>
      
      <div v-if="cartItems.length > 0" class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.images[0]" :alt="item.name" />
            </div>
            
            <div class="item-details">
              <router-link :to="`/product/${item.id}`" class="item-name">
                {{ item.name }}
              </router-link>
              <div class="item-brand">{{ item.brand }}</div>
              <div class="item-price">
                {{ (item.discountedPrice || item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
              </div>
            </div>
            
            <div class="item-quantity">
              <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
              <input 
                type="number" 
                v-model.number="item.quantity" 
                min="1" 
                :max="item.stock"
                @change="updateQuantity(item.id, item.quantity)"
              />
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            
            <div class="item-total">
              {{ ((item.discountedPrice || item.price) * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
            </div>
            
            <button class="remove-btn" @click="removeItem(item.id)">
              <span class="material-icons">close</span>
            </button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h2>{{ t('common.orderSummary') }}</h2>
          
          <div class="summary-row">
            <span>{{ t('common.subtotal') }}</span>
            <span>{{ cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
          </div>
          
          <div class="summary-row">
            <span>{{ t('common.shipping') }}</span>
            <span>{{ t('common.calculatedAtCheckout') }}</span>
          </div>
          
          <div class="summary-row total">
            <span>{{ t('common.total') }}</span>
            <span>{{ cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
          </div>
          
          <button class="checkout-btn" @click="proceedToCheckout">
            {{ t('common.checkout') }}
          </button>
          
          <button class="continue-btn" @click="continueShopping">
            {{ t('common.continue') }}
          </button>
        </div>
      </div>
      
      <div v-else class="empty-cart">
        <span class="material-icons">shopping_cart</span>
        <h2>{{ t('common.emptyCart') }}</h2>
        <p>{{ t('common.emptyCartMessage') }}</p>
        <button class="continue-btn" @click="continueShopping">
          {{ t('common.continue') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-view {
  padding-top: 32px;
  
  h1 {
    margin-bottom: 32px;
  }
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
}

.cart-items {
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .item-details {
    .item-name {
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--text-color);
      text-decoration: none;
      
      &:hover {
        color: var(--primary-color);
      }
    }
    
    .item-brand {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    
    .item-price {
      font-weight: 500;
      color: var(--accent-color);
      margin-top: 4px;
    }
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    
    button {
      width: 32px;
      height: 32px;
      background: none;
      border: none;
      cursor: pointer;
      
      &:hover {
        color: var(--primary-color);
      }
    }
    
    input {
      width: 48px;
      height: 32px;
      border: none;
      text-align: center;
      -moz-appearance: textfield;
      
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  
  .item-total {
    font-weight: 500;
    min-width: 100px;
    text-align: right;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 4px;
    
    &:hover {
      color: var(--error-color);
    }
  }
}

.cart-summary {
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  height: fit-content;
  
  h2 {
    font-size: 1.2rem;
    margin-bottom: 16px;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    
    &.total {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
      font-weight: 600;
      font-size: 1.1rem;
    }
  }
  
  .checkout-btn {
    width: 100%;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px;
    font-weight: 500;
    margin-top: 24px;
    cursor: pointer;
    
    &:hover {
      background-color: darken(#FF5964, 10%);
    }
  }
  
  .continue-btn {
    width: 100%;
    background-color: transparent;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 12px;
    margin-top: 12px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
}

.empty-cart {
  text-align: center;
  padding: 64px 0;
  
  .material-icons {
    font-size: 48px;
    color: var(--text-secondary);
    margin-bottom: 16px;
  }
  
  h2 {
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 24px;
  }
  
  .continue-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px 24px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      background-color: var(--primary-dark);
    }
  }
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: auto 1fr auto;
    
    .item-total {
      display: none;
    }
  }
}
</style>