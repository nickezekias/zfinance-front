<script setup lang="ts">
import { RouterView } from 'vue-router'
import PrimeToast from 'primevue/toast'
import AppBar from './AppBar.vue'
import BottomBar from './mobile/BottomBar.vue';
</script>

<template>
  <div class="main">
    <PrimeToast />
    <AppBar />
    <BottomBar class="md:hidden"/>
    <RouterView class="p-2 md:p-4"/>
  </div>
</template>