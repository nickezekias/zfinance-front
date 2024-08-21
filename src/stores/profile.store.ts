import { defineStore } from 'pinia'
import profileService from '@/app/features/profile/adapters/profile.service'

export const useProfileStore = defineStore('profile', () => {
  async function updateProfileInfo(data: FormData) {
    const response = await profileService.updateProfileInfo(data)
    return response.data
  }

  return { updateProfileInfo }
})