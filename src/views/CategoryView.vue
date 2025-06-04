<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '../data/products'
import ProductCard from '../components/product/ProductCard.vue'

const { t } = useI18n()
const route = useRoute()

const category = computed(() => route.params.category as string)
const searchQuery = computed(() => route.query.search as string || '')

const filteredProducts = computed(() => {
  let result = [...products]
  
  if (category.value !== 'all') {
    result = result.filter(product => product.category === category.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => {
      const name = typeof product.name === 'string' ? product.name : ''
      const description = typeof product.description === 'string' ? product.description : ''
      const brand = typeof product.brand === 'string' ? product.brand : ''
      
      return name.toLowerCase().includes(query) ||
             description.toLowerCase().includes(query) ||
             brand.toLowerCase().includes(query)
    })
  }
  
  if (sortBy.value) {
    switch (sortBy.value) {
      case 'price-low':
        result.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price))
        break
      case 'price-high':
        result.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew))
        break
    }
  }
  
  return result
})

const sortBy = ref('')
const showFilters = ref(false)

const categoryName = computed(() => {
  if (category.value === 'all') return t('categories.all')
  if (category.value === 'drones') return t('categories.drones')
  if (category.value === 'humanoid-robots') return t('categories.humanoidRobots')
  if (category.value === 'quadruped-robots') return t('categories.quadrupedRobots')
  return category.value
})

watch(() => route.params.category, () => {
  sortBy.value = ''
})

function toggleFilters() {
  showFilters.value = !showFilters.value
}
</script>

<template>
  <div class="category-view">
    <div class="container">
      <div class="category-header">
        <h1>{{ categoryName }}</h1>
        <p v-if="filteredProducts.length > 0">
          {{ filteredProducts.length }} {{ t('search.results') }}
        </p>
        <p v-else>{{ t('search.noResults') }}</p>
      </div>
      
      <div class="category-controls">
        <button class="filter-toggle" @click="toggleFilters">
          {{ t('filter.filter') }}
          <span class="material-icons">{{ showFilters ? 'expand_less' : 'expand_more' }}</span>
        </button>
        
        <div class="sort-controls">
          <span>{{ t('sort.sortBy') }}:</span>
          <select v-model="sortBy">
            <option value="">{{ t('sort.relevance') }}</option>
            <option value="price-low">{{ t('sort.priceLowToHigh') }}</option>
            <option value="price-high">{{ t('sort.priceHighToLow') }}</option>
            <option value="rating">{{ t('sort.topRated') }}</option>
            <option value="newest">{{ t('sort.newest') }}</option>
          </select>
        </div>
      </div>
      
      <div class="category-layout">
        <!-- Filters Panel -->
        <aside class="filters-panel" :class="{ 'active': showFilters }">
          <div class="filter-section">
            <h3>{{ t('filter.price') }}</h3>
            <div class="price-inputs">
              <input type="number" :placeholder="t('filter.min')" />
              <span>-</span>
              <input type="number" :placeholder="t('filter.max')" />
              <button>{{ t('filter.apply') }}</button>
            </div>
          </div>
          
          <div class="filter-section">
            <h3>{{ t('product.brands') }}</h3>
            <div class="checkbox-list">
              <label>
                <input type="checkbox" value="aerotech" />
                AeroTech
              </label>
              <label>
                <input type="checkbox" value="skytech" />
                SkyTech
              </label>
              <label>
                <input type="checkbox" value="robolife" />
                RoboLife
              </label>
              <label>
                <input type="checkbox" value="techdynamics" />
                TechDynamics
              </label>
            </div>
          </div>
          
          <div class="filter-section">
            <h3>{{ t('product.rating') }}</h3>
            <div class="rating-list">
              <label>
                <input type="radio" name="rating" value="4" />
                4+ {{ t('product.stars') }}
              </label>
              <label>
                <input type="radio" name="rating" value="3" />
                3+ {{ t('product.stars') }}
              </label>
              <label>
                <input type="radio" name="rating" value="2" />
                2+ {{ t('product.stars') }}
              </label>
              <label>
                <input type="radio" name="rating" value="1" />
                1+ {{ t('product.stars') }}
              </label>
            </div>
          </div>
          
          <div class="filter-actions">
            <button class="apply-btn">{{ t('filter.apply') }}</button>
            <button class="reset-btn">{{ t('filter.reset') }}</button>
          </div>
        </aside>
        
        <!-- Products Grid -->
        <div class="products-container">
          <div v-if="filteredProducts.length > 0" class="products-grid">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
          <div v-else class="no-results">
            <h2>{{ t('search.noProductsFound') }}</h2>
            <p>{{ t('search.tryAdjusting') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-view {
  padding: 32px 0;
  min-height: calc(100vh - 64px);
  background: var(--background-color);
}

.category-header {
  margin-bottom: 24px;
  
  h1 {
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-secondary);
  }
}

.category-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  
  .filter-toggle {
    display: none;
    align-items: center;
    background: none;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 1rem;
    cursor: pointer;
    
    .material-icons {
      margin-left: 4px;
    }
  }
  
  .sort-controls {
    display: flex;
    align-items: center;
    
    span {
      margin-right: 8px;
    }
    
    select {
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--background-color);
      outline: none;
      
      &:focus {
        border-color: var(--primary-color);
      }
    }
  }
}

.category-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  position: relative;
}

.filters-panel {
  position: sticky;
  top: 96px;
  height: fit-content;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 24px;
  
  .filter-section {
    &:not(:last-child) {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-color);
    }
    
    h3 {
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
    
    .price-inputs {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 12px;
      align-items: center;
      
      input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        outline: none;
        
        &:focus {
          border-color: var(--primary-color);
        }
      }
      
      span {
        color: var(--text-secondary);
      }
      
      button {
        grid-column: 1 / -1;
        margin-top: 12px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;
        
        &:hover {
          background-color: var(--primary-dark);
        }
      }
    }
    
    .checkbox-list, .rating-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      
      label {
        display: flex;
        align-items: center;
        cursor: pointer;
        
        input {
          margin-right: 12px;
        }
      }
    }
  }
  
  .filter-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    
    button {
      flex: 1;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .apply-btn {
      background-color: var(--primary-color);
      color: white;
      border: none;
      
      &:hover {
        background-color: var(--primary-dark);
      }
    }
    
    .reset-btn {
      background-color: transparent;
      border: 1px solid var(--border-color);
      
      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
  }
}

.products-container {
  min-height: 400px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.no-results {
  text-align: center;
  padding: 48px 0;
  
  h2 {
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-secondary);
  }
}

@media (max-width: 1200px) {
  .category-layout {
    grid-template-columns: 240px 1fr;
    gap: 32px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .category-controls {
    .filter-toggle {
      display: flex;
    }
  }
  
  .category-layout {
    display: block;
  }
  
  .filters-panel {
    display: none;
    position: static;
    margin-bottom: 24px;
    
    &.active {
      display: block;
    }
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>