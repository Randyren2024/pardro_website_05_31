<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { categories } from '../data/categories'
import { products } from '../data/products'
import ProductCard from '../components/product/ProductCard.vue'

const { t } = useI18n()
const router = useRouter()

const featuredProducts = ref(products.filter(product => product.isFeatured))
const newProducts = ref(products.filter(product => product.isNew))

// Banner carousel functionality
const bannerImages = [
  '/images/m16_banner.png',
  '/images/CompanyProfile_p1_img1.jpeg'
]
const currentBannerIndex = ref(0)
let bannerInterval: NodeJS.Timeout | null = null

const nextBanner = () => {
  currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerImages.length
}

onMounted(() => {
  bannerInterval = setInterval(nextBanner, 3000)
})

onUnmounted(() => {
  if (bannerInterval) {
    clearInterval(bannerInterval)
  }
})

</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-carousel">
        <div 
          v-for="(_, index) in bannerImages" 
          :key="index"
          class="hero-slide"
          :class="{ active: index === currentBannerIndex }"
          :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${bannerImages[index]}')` }"
        ></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1>{{ t('welcome') }}</h1>
          <p>Discover the future of technology with our cutting-edge robots and drones.</p>
          <div class="hero-buttons">
            <button 
              v-for="(category, index) in categories" 
              :key="category.id" 
              :class="index === 0 ? 'primary-btn' : 'secondary-btn'" 
              @click="router.push(`/category/${category.id}`)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="carousel-indicators">
        <button 
          v-for="(_, index) in bannerImages" 
          :key="index"
          class="indicator"
          :class="{ active: index === currentBannerIndex }"
          @click="currentBannerIndex = index"
        ></button>
      </div>
    </section>
    
    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2>{{ t('categories.all') }}</h2>
        <div class="categories-grid">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-card"
            @click="router.push(`/category/${category.id}`)"
          >
            <div class="category-image">
              <img :src="category.image" :alt="category.name" />
            </div>
            <div class="category-details">
              <h3>{{ category.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Products Section -->
    <section class="products-section">
      <div class="container">
        <h2>{{ t('product.featured') }}</h2>
        <div class="products-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
    
    <!-- New Arrivals Section -->
    <section class="products-section">
      <div class="container">
        <h2>{{ t('product.newArrivals') }}</h2>
        <div class="products-grid">
          <ProductCard
            v-for="product in newProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
    
    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>{{ t('stayUpdated') }}</h2>
          <p>Subscribe to our newsletter for the latest product updates and exclusive offers.</p>
          <div class="newsletter-form">
            <input type="email" :placeholder="t('emailAddress')" />
            <button>{{ t('subscribe') }}</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  
  .hero-carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    
    .hero-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      
      &.active {
        opacity: 1;
      }
      
      // Special styling for m16_banner to zoom out
      &:nth-child(1) {
        background-size: 90%;
        background-repeat: no-repeat;
        background-color: #f8f9fa;
        background-position: center center;
      }
    }
  }
  
  .container {
    position: relative;
    z-index: 2;
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 3;
    
    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        background: white;
        border-color: white;
      }
      
      &:hover {
        border-color: white;
      }
    }
  }
  
  .hero-content {
    max-width: 600px;
    
    h1 {
      font-size: 3rem;
      margin-bottom: 16px;
      animation: fadeInUp 0.8s ease;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 32px;
      animation: fadeInUp 0.8s ease 0.2s both;
    }
    
    .hero-buttons {
      display: flex;
      gap: 16px;
      animation: fadeInUp 0.8s ease 0.4s both;
      
      button {
        padding: 12px 24px;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .primary-btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
        
        &:hover {
          background-color: var(--primary-dark);
        }
      }
      
      .secondary-btn {
        background-color: transparent;
        color: white;
        border: 1px solid white;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}

section {
  padding: 64px 0;
  
  h2 {
    text-align: center;
    margin-bottom: 32px;
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.category-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    
    .category-image img {
      transform: scale(1.05);
    }
  }
  
  .category-image {
    height: 200px;
    width: 100%;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }
  }
  
  .category-details {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 16px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
    
    h3 {
      margin-bottom: 4px;
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
    }
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.newsletter-section {
  background-color: var(--primary-light);
  color: white;
  
  .newsletter-content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    
    h2 {
      margin-bottom: 16px;
    }
    
    p {
      margin-bottom: 24px;
    }
    
    .newsletter-form {
      display: flex;
      
      input {
        flex: 1;
        padding: 12px 16px;
        border: none;
        border-radius: 4px 0 0 4px;
        outline: none;
      }
      
      button {
        background-color: var(--accent-color);
        color: white;
        border: none;
        border-radius: 0 4px 4px 0;
        padding: 0 24px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: darken(#FF5964, 10%);
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero {
    height: 60vh;
    
    .hero-content {
      text-align: center;
      
      h1 {
        font-size: 2.5rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        
        button {
          width: 100%;
        }
      }
    }
  }
  
  .newsletter-section .newsletter-form {
    flex-direction: column;
    
    input {
      border-radius: 4px;
      margin-bottom: 12px;
    }
    
    button {
      border-radius: 4px;
      padding: 12px;
    }
  }
}
</style>
