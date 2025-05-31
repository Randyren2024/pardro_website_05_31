<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark' || 
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme">
    <span class="material-icons">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
  </button>
</template>

<style lang="scss" scoped>
.theme-toggle {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 16px;
  transition: all 0.2s;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
  }
  
  .material-icons {
    font-size: 1.2rem;
  }
}
</style>