import { ref } from 'vue'
import authService from '@/app/features/admin/auth/adapters/admin.auth.service'
import { defineStore } from 'pinia'
import type { LoginRequest, PasswordResetRequest } from '@/@types/auth.interface'
import type { Ref } from 'vue'
import type Admin from '@/app/domain/admin.model'
import { useRouter } from 'vue-router'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const user: Ref<Admin | null> = ref(null)
  const router = useRouter()

  const clearAuthenticatedUser = (): void => {
    setUser(null)
    setIsGuest('1')
  }

  const isGuest = (): boolean => {
    if (window.localStorage.getItem('adminGuest') === '1') {
      return true
    } else {
      return false
    }
  }

  const setAuthenticatedUser = (data: Admin): void => {
    setUser(data)
    setIsGuest('0')
  }

  const setIsGuest = (value: string): void => {
    window.localStorage.setItem('adminGuest', value)
  }

  const setUser = (data: Admin | null): void => {
    user.value = data
  }

  async function getAuthenticatedUser() {
    const response = await authService.getAuthenticatedUser()
    setAuthenticatedUser(response.data.data as Admin)
  }

  async function login(payload: LoginRequest) {
    await authService.login(payload)
    await getAuthenticatedUser()
  }

  async function logout() {
    await authService.logout()
    clearAuthenticatedUser()
    if (router.currentRoute.value.name != 'admin.auth.login') {
      router.push({ name: 'admin.auth.login' })
    }
  }

  async function resetPassword(payload: PasswordResetRequest) {
    const response = await authService.resetPassword(payload)
    return response.data
  }

  async function sendPasswordResetLink(payload: string) {
    const response = await authService.sendPasswordResetLink(payload)
    return response.data
  }

  return {
    clearAuthenticatedUser,
    getAuthenticatedUser,
    isGuest,
    login,
    logout,
    resetPassword,
    sendPasswordResetLink,
    setIsGuest,
    setUser,
    user
  }
})
