<template>
  <a :href="whatsappLink" target="_blank" class="whatsapp-button">
    <svg xmlns="http://www.w3.org/2000/svg"
aria-label="WhatsApp" role="img"
viewBox="0 0 512 512"><rect
width="512" height="512"
rx="15%"
fill="#25d366"/><path fill="#25d366" stroke="#ffffff" stroke-width="26" d="M123 393l14-65a138 138 0 1150 47z"/><path fill="#ffffff" d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"/></svg>
  </a>
</template>

<script setup lang="ts">
const whatsappLink = 'https://api.whatsapp.com/send?phone=8613362853598';
</script>

<style scoped>
.whatsapp-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-7px);
  }
}

.whatsapp-button svg {
  width: 60px; /* Adjust size as needed */
  height: 60px; /* Adjust size as needed */
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.whatsapp-button:hover svg {
  transform: scale(1.1);
}
</style>