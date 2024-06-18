<script setup lang="ts">
import { RouterView } from 'vue-router'
import PrimeToast from 'primevue/toast'
</script>

<template>
  <div class="main">
    <PrimeToast />
    <RouterView />
  </div>
</template>