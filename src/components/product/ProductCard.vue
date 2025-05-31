<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Product } from '../../types'

const { t } = useI18n()

const props = defineProps<{
  product: Product
}>()

function inquireProduct() {
  // Here you would implement the inquiry logic
  // For example, opening a contact form or modal
  console.log('Inquire about product:', props.product.name)
}
</script>

<template>
  <div class="product-card">
    <div class="badges">
      <span v-if="product.isNew" class="badge new">{{ t('product.new') }}</span>
      <span v-if="product.discountedPrice" class="badge sale">{{ t('product.sale') }}</span>
    </div>
    
    <router-link :to="`/product/${product.id}`" class="product-image">
      <img :src="product.images[0]" :alt="product.name" />
      <div class="image-overlay">
        <button class="quick-view-btn">{{ t('product.quickView') }}</button>
      </div>
    </router-link>
    
    <div class="product-info">
      <h3 class="product-name">
        <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
      </h3>
      
      <div class="product-brand">{{ product.brand }}</div>
      
      <div class="product-rating">
        <div class="stars" :style="`--rating: ${product.rating}`"></div>
        <span class="review-count">({{ product.reviewCount }})</span>
      </div>
      
      <div class="product-actions">
        <button class="inquire-btn" @click="inquireProduct">
          Inquire Now
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  position: relative;
  background-color: var(--background-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    .image-overlay {
      opacity: 1;
    }
  }
}

.badges {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  display: flex;
  gap: 8px;
  
  .badge {
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    
    &.new {
      background-color: var(--primary-color);
      color: white;
    }
    
    &.sale {
      background-color: var(--accent-color);
      color: white;
    }
  }
}

.product-image {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    
    .quick-view-btn {
      background-color: white;
      color: var(--primary-color);
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 1rem;
  margin-bottom: 4px;
  
  a {
    color: var(--text-color);
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.product-brand {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .stars {
    position: relative;
    display: inline-block;
    font-size: 0.8rem;
    width: 5em;
    height: 1em;
    
    &::before {
      content: "★★★★★";
      color: #ddd;
      position: absolute;
      top: 0;
      left: 0;
    }
    
    &::after {
      content: "★★★★★";
      color: #FFD700;
      position: absolute;
      top: 0;
      left: 0;
      width: calc(var(--rating) * 1em);
      overflow: hidden;
    }
  }
  
  .review-count {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-left: 4px;
  }
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  .inquire-btn {
    width: 100%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: var(--primary-dark);
    }
  }
}

@media (max-width: 480px) {
  .product-actions {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
}
</style>