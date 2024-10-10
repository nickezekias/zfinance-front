import { defineStore } from 'pinia'
import { ref } from 'vue'
import objService from '@/app/features/notification/adapters/notification.service'
import type { NotificationInterface } from '@/@types/notification.interface'
import type { Ref } from 'vue'

export const useNotificationStore = defineStore('notificatino', () => {
  const notifications: Ref<Array<NotificationInterface>> = ref([])

  async function getAll() {
    const response = await objService.getAll()
    notifications.value = response.data.data
  }

  return { getAll, notifications }
})
