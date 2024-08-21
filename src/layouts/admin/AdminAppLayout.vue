<script setup lang="ts">
import { RouterView } from 'vue-router'
import PrimeToast from 'primevue/toast'
import AdminAppBar from './AdminAppBar.vue'
</script>

<template>
  <div class="main">
    <PrimeToast />
    <AdminAppBar />
    <RouterView class="p-2 md:p-4"/>
  </div>
</template>