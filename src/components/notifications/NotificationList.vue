<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getApiErrors } from '@/app/utils/helpers';
import { useNotificationStore } from '@/stores/notification.store';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import type { AxiosError } from 'axios';

import NotificationItem from './NotificationItem.vue';
import ProgressBar from 'primevue/progressbar';

const loading = ref(true)
const objStore = useNotificationStore()
const { t } = useI18n()
const toast = useToast()

onMounted(async () => {
  loading.value = true
  try {
    await objStore.getAll()
  } catch (e) {
    toast.add({
      severity: "error",
      summary: t('labels.operationFailure'),
      detail: getApiErrors(e as AxiosError),
      life: 10000,
    });
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <ProgressBar v-if="loading" mode="indeterminate" style="height: 1px"></ProgressBar>

  <ul class="notification-list">
    <slot>
      <NotificationItem v-for="obj in objStore.notifications" :key="obj.id" :data="obj">
      </NotificationItem>
    </slot>
  </ul>
</template>

<style lang="css" scoped>
.notifications-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>