<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { categories } from '../../data/categories'
import LanguageSelector from '../common/LanguageSelector.vue'
import ThemeToggle from '../common/ThemeToggle.vue'

const { t } = useI18n()
const router = useRouter()

const searchQuery = ref('')
const mobileMenuOpen = ref(false)

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/category/all',
      query: { search: searchQuery.value }
    })
    searchQuery.value = ''
    mobileMenuOpen.value = false
  }
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function navigateTo(path: string) {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <!-- Logo -->
      <div class="logo" @click="navigateTo('/')">
        <h1>Partdro</h1>
      </div>

      <!-- Navigation -->
      <nav class="desktop-nav">
        <ul class="nav-links">
          <li><router-link to="/">{{ t('navigation.home') }}</router-link></li>
          <li v-for="category in categories" :key="category.id">
            <router-link :to="`/category/${category.id}`">{{ category.name }}</router-link>
          </li>
        </ul>
      </nav>

      <!-- Search, language, theme -->
      <div class="header-actions">
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchQuery" 
            :placeholder="t('search')" 
            @keyup.enter="handleSearch" 
          />
          <button class="search-btn" @click="handleSearch">
            <span class="material-icons">search</span>
          </button>
        </div>

        <LanguageSelector />
        <ThemeToggle />

        <router-link to="/account" class="account-icon">
          <span class="material-icons">person</span>
        </router-link>

        <!-- Mobile menu toggle -->
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span class="material-icons">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile navigation menu -->
    <div class="mobile-nav" :class="{ 'open': mobileMenuOpen }">
      <div class="mobile-search">
        <input 
          type="text" 
          v-model="searchQuery" 
          :placeholder="t('search')" 
          @keyup.enter="handleSearch" 
        />
        <button @click="handleSearch">
          <span class="material-icons">search</span>
        </button>
      </div>
      <ul class="mobile-nav-links">
        <li @click="navigateTo('/')">{{ t('navigation.home') }}</li>
        <li v-for="category in categories" :key="category.id" @click="navigateTo(`/category/${category.id}`)">
          {{ category.name }}
        </li>
        <li @click="navigateTo('/account')">{{ t('navigation.account') }}</li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  background-color: var(--primary-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  cursor: pointer;
  
  h1 {
    font-size: 1.8rem;
    margin: 0;
    color: white;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
      opacity: 0.5;
    }
  }
}

.desktop-nav {
  display: flex;
  
  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      margin: 0 16px;
      
      a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        transition: color 0.2s;
        
        &:hover, &.router-link-active {
          color: white;
        }
      }
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  
  .search-container {
    position: relative;
    margin-right: 16px;
    
    input {
      padding: 8px 16px;
      padding-right: 40px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      outline: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      transition: all 0.2s;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
      
      &:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
    
    .search-btn {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.6);
      
      &:hover {
        color: white;
      }
    }
  }
  
  .account-icon {
    position: relative;
    margin-left: 16px;
    color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      color: white;
    }
  }
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 8px;
  margin-left: 16px;
  
  &:hover {
    color: white;
  }
}

.mobile-nav {
  display: none;
  background-color: var(--primary-dark);
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  .mobile-search {
    display: flex;
    margin-bottom: 16px;
    
    input {
      flex: 1;
      padding: 8px 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px 0 0 24px;
      outline: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    
    button {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-left: none;
      border-radius: 0 24px 24px 0;
      padding: 0 16px;
      cursor: pointer;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
  }
  
  .mobile-nav-links {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      
      &:last-child {
        border-bottom: none;
      }
      
      &:hover {
        color: white;
      }
    }
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .header-actions {
    .search-container {
      display: none;
    }
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-nav {
    display: none;
    
    &.open {
      display: block;
    }
  }
}
</style>
