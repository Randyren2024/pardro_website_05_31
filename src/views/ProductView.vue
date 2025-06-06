<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '../data/products'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const productId = computed(() => route.params.id as string)
const product = computed(() => products.find(p => p.id === productId.value))

// Computed properties for localized product data
const localizedProductName = computed(() => {
  if (!product.value) return ''
  const name = product.value.name
  if (typeof name === 'string') {
    return name
  }
  // If name is a multi-language object, return empty string for now
  return ''
})

const localizedProductDescription = computed(() => {
  if (!product.value) return ''
  const description = product.value.description
  if (typeof description === 'string') {
    return description
  }
  // If description is a multi-language object, return empty string for now
  return ''
})

const localizedProductFeatures = computed(() => {
  if (!product.value) return []
  const features = product.value.features
  if (Array.isArray(features)) {
    return features
  }
  // If features is a multi-language object, return empty array for now
  return []
})

const localizedProductSpecifications = computed(() => {
  if (!product.value || !product.value.specifications) return {}
  const specs = product.value.specifications
  // Check if it's a simple Record<string, string> or nested multi-language object
  if (typeof specs === 'object' && specs !== null) {
    return specs
  }
  return {}
})

const activeTab = ref('description')
const activeImageIndex = ref(0)

// Get related products
const relatedProducts = computed(() => {
  if (!product.value || !product.value.relatedProducts) return []
  return products.filter(p => product.value?.relatedProducts?.includes(p.id))
})

function inquireProduct() {
  window.open('https://api.whatsapp.com/send?phone=8613362853598', '_blank');
}

function setTab(tab: string) {
  activeTab.value = tab
}

function setActiveImage(index: number) {
  activeImageIndex.value = index
}

// If product not found, redirect to 404
onMounted(() => {
  if (!product.value) {
    router.push('/not-found')
  }
})
</script>

<template>
  <div class="product-view" v-if="product">
    <div class="container">
      <div class="product-layout">
        <!-- Product Images -->
        <div class="product-images">
          <div class="main-image">
            <img :src="product.images[activeImageIndex]" :alt="localizedProductName" />
          </div>
          <div class="image-thumbnails" v-if="product.images.length > 1">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              class="thumbnail"
              :class="{ 'active': activeImageIndex === index }"
              @click="setActiveImage(index)"
            >
              <img :src="image" :alt="`${localizedProductName} - ${index + 1}`" />
            </div>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="product-info">
          <div class="product-brand">{{ product.brand }}</div>
          <h1 class="product-title">{{ localizedProductName }}</h1>
          
          <div class="product-meta">
            <div class="product-rating">
              <div class="stars" :style="`--rating: ${product.rating}`"></div>
              <span class="review-count">{{ product.reviewCount }} {{ t('product.reviews') }}</span>
            </div>
          </div>
          
          <div class="product-short-description">
            {{ localizedProductDescription }}
          </div>
          
          <div class="product-features">
            <h3>{{ t('product.keyFeatures') }}</h3>
            <ul>
              <li v-for="(feature, index) in localizedProductFeatures.slice(0, 4)" :key="index">
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="product-actions">
            <button class="inquire-btn" @click="inquireProduct">
              Inquire Now
            </button>
          </div>
        </div>
      </div>
      
      <!-- Product Tabs -->
      <div class="product-tabs">
        <div class="tab-headers">
          <button 
            class="tab-header" 
            :class="{ 'active': activeTab === 'description' }"
            @click="setTab('description')"
          >
            {{ t('product.description') }}
          </button>
          <button 
            class="tab-header" 
            :class="{ 'active': activeTab === 'specifications' }"
            @click="setTab('specifications')"
          >
            {{ t('product.specifications') }}
          </button>
        </div>
        
        <div class="tab-content">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="tab-pane description-tab">
            <p>{{ localizedProductDescription }}</p>
            <div class="features-list">
              <h3>{{ t('product.features') }}</h3>
              <ul>
                <li v-for="(feature, index) in localizedProductFeatures" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Specifications Tab -->
          <div v-if="activeTab === 'specifications'" class="tab-pane specifications-tab">
            <table class="specs-table">
              <tbody>
                <tr v-for="(value, key) in localizedProductSpecifications" :key="key">
                  <th>{{ key }}</th>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Related Products -->
      <div class="related-products" v-if="relatedProducts.length > 0">
        <h2>{{ t('product.relatedProducts') }}</h2>
        <div class="products-grid">
          <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="related-product">
            <img :src="relatedProduct.images[0]" :alt="typeof relatedProduct.name === 'string' ? relatedProduct.name : ''" />
            <h3>{{ relatedProduct.name }}</h3>
            <button class="inquire-btn" @click="inquireProduct">Inquire Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-view {
  padding-top: 32px;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.product-images {
  .main-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .image-thumbnails {
    display: flex;
    gap: 12px;
    
    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      
      &.active {
        border-color: var(--primary-color);
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.product-info {
  .product-brand {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-bottom: 8px;
  }
  
  .product-title {
    font-size: 2rem;
    margin-bottom: 16px;
  }
  
  .product-meta {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
    .product-rating {
      display: flex;
      align-items: center;
      
      .stars {
        position: relative;
        display: inline-block;
        font-size: 1rem;
        width: 5em;
        height: 1em;
        margin-right: 8px;
        
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
        color: var(--text-secondary);
      }
    }
  }
  
  .product-short-description {
    margin-bottom: 24px;
    line-height: 1.6;
  }
  
  .product-features {
    margin-bottom: 24px;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 12px;
    }
    
    ul {
      list-style: none;
      padding-left: 0;
      
      li {
        position: relative;
        padding-left: 24px;
        margin-bottom: 8px;
        
        &::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--success-color);
          font-weight: bold;
        }
      }
    }
  }
  
  .product-actions {
    margin-bottom: 24px;
    
    .inquire-btn {
      width: 100%;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 16px;
      font-size: 1.1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: var(--primary-dark);
      }
    }
  }
}

.product-tabs {
  margin-bottom: 48px;
  
  .tab-headers {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 24px;
    
    .tab-header {
      padding: 12px 24px;
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: transparent;
        transition: background-color 0.2s;
      }
      
      &.active {
        color: var(--primary-color);
        
        &::after {
          background-color: var(--primary-color);
        }
      }
    }
  }
  
  .tab-content {
    .tab-pane {
      animation: fadeIn 0.3s;
      
      &.description-tab {
        p {
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .features-list {
          h3 {
            font-size: 1.2rem;
            margin-bottom: 16px;
          }
          
          ul {
            list-style: none;
            padding-left: 0;
            
            li {
              position: relative;
              padding-left: 24px;
              margin-bottom: 12px;
              
              &::before {
                content: "✓";
                position: absolute;
                left: 0;
                color: var(--success-color);
                font-weight: bold;
              }
            }
          }
        }
      }
      
      &.specifications-tab {
        .specs-table {
          width: 100%;
          border-collapse: collapse;
          
          tr {
            border-bottom: 1px solid var(--border-color);
            
            &:last-child {
              border-bottom: none;
            }
          }
          
          th, td {
            padding: 12px;
            text-align: left;
          }
          
          th {
            width: 40%;
            font-weight: 600;
          }
          
          td {
            width: 60%;
          }
          
          tr:nth-child(even) {
            background-color: rgba(0, 0, 0, 0.02);
          }
        }
      }
    }
  }
}

.related-products {
  h2 {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }

  .related-product {
    background: var(--background-color);
    border-radius: 8px;
    padding: 16px;
    text-align: center;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 12px;
    }

    h3 {
      margin-bottom: 12px;
      font-size: 1.1rem;
    }

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
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 992px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .product-tabs {
    .tab-headers {
      overflow-x: auto;
      white-space: nowrap;
      
      .tab-header {
        padding: 12px 16px;
      }
    }
  }
}
</style>