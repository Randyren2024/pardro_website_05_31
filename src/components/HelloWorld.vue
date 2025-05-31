<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/" target="_blank">Vue 3 Docs</a>, and
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a>
    to learn more.
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
