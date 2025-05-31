<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { languages } from '../../data/languages'

const { locale } = useI18n()
const dropdownOpen = ref(false)

function changeLanguage(code: string) {
  locale.value = code
  dropdownOpen.value = false
  localStorage.setItem('language', code)
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

// Get current language data
const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})
</script>

<template>
  <div class="language-selector">
    <button class="language-btn" @click="toggleDropdown" :title="currentLanguage.name">
      {{ currentLanguage.code.toUpperCase() }}
    </button>
    
    <div class="language-dropdown" v-if="dropdownOpen">
      <div 
        v-for="lang in languages" 
        :key="lang.code" 
        class="language-option"
        :class="{ 'active': locale === lang.code }"
        @click="changeLanguage(lang.code)"
      >
        <span class="language-code">{{ lang.code.toUpperCase() }}</span>
        <span class="language-name">{{ lang.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language-selector {
  position: relative;
  margin-left: 16px;
}

.language-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 6px 12px;
  min-width: 40px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
  }
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 180px;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-top: 4px;
  z-index: 200;
  overflow: hidden;
  
  .language-option {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }
    
    &.active {
      background-color: rgba(255, 255, 255, 0.15);
      color: white;
    }
    
    .language-code {
      font-size: 0.875rem;
      font-weight: 500;
      margin-right: 12px;
      min-width: 28px;
    }
    
    .language-name {
      font-size: 0.875rem;
    }
  }
}

@media (max-width: 768px) {
  .language-btn {
    padding: 4px 8px;
    min-width: 36px;
    font-size: 0.8125rem;
  }
}
</style>