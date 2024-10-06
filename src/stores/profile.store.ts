import { defineStore } from 'pinia'
import profileService from '@/app/features/profile/adapters/profile.service'

export const useProfileStore = defineStore('profile', () => {
  async function updateProfileInfo(data: FormData) {
    const response = await profileService.updateProfileInfo(data)
    console.log("PROFILE_UPDATE_RESPONSE", response)
    return response.data
  }

  return { updateProfileInfo }
})