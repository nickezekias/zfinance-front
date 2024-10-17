<script setup lang="ts">
import { RouterView } from 'vue-router'
import PrimeToast from 'primevue/toast'
import AdminAppBar from './AdminAppBar.vue'
import AdminBottomBar from './mobile/AdminBottomBar.vue';

</script>

<template>
  <div class="main">
    <PrimeToast />
    <AdminAppBar />
    <AdminBottomBar class="md:hidden"/>
    <RouterView class="p-2 md:p-4 pb-32 md:pb-2"/>
  </div>
</template>