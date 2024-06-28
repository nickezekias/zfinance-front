import { ref } from 'vue'
import authService from '@/app/features/auth/adapters/auth.service'
import { defineStore } from 'pinia'
import type { LoginRequest, PasswordResetRequest, RegisterRequest } from '@/@types/auth.interface'
import type { Ref } from 'vue'
import type User from '@/app/domain/user.model'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)

  async function getAuthenticatedUser() {
    const response = await authService.getAuthenticatedUser()
    user.value = response.data as User
  }

  async function login(payload: LoginRequest) {
    const response = await authService.login(payload)
    console.log("LOGIN_RESPONSE", response)
    await getAuthenticatedUser()
  }

  async function logout() {
    await authService.logout()
  }

  async function register(payload: RegisterRequest) {
    const response = await authService.register(payload)
    return response.data
  }

  async function resetPassword(payload: PasswordResetRequest) {
    const response = await authService.resetPassword(payload)
    return response.data
  }

  async function sendPasswordResetLink(payload: string) {
    const response = await authService.sendPasswordResetLink(payload)
    return response.data
  }

  return { login, logout, register, resetPassword, sendPasswordResetLink }
})
