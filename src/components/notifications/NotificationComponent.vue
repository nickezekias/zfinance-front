<script setup lang="ts">
import { ref } from 'vue'
import Drawer from 'primevue/drawer'
import NotificationList from './NotificationList.vue';

const isDrawer = ref(false)

</script>

<template>
  <PrimeButton @click="isDrawer = true" size="large" icon="pi pi-bell" aria-haspopup="true" outlined rounded />

  <Drawer v-model:visible="isDrawer" :header="$t('labels.notification', 2)" position="right">
    <NotificationList />
  </Drawer>
</template>