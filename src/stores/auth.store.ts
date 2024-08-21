import { ref } from 'vue'
import authService from '@/app/features/auth/adapters/auth.service'
import { defineStore } from 'pinia'
import type { LoginRequest, PasswordResetRequest, RegisterRequest } from '@/@types/auth.interface'
import type { Ref } from 'vue'
import type User from '@/app/domain/user.model'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)

  const clearAuthenticatedUser = (): void => {
    setUser(null)
    setIsGuest('1')
  }

  const isAdmin = (): boolean => {
    return user.value != null && user.value.isAdmin
  }

  const isGuest = (): boolean => {
    if (window.localStorage.getItem('guest') === '1') {
      return true
    } else {
      return false
    }
  }

  const setAuthenticatedUser = (data: User): void => {
    setUser(data)
    setIsGuest('0')
  }

  const setIsGuest = (value: string): void => {
    window.localStorage.setItem('guest', value)
  }

  const setUser = (data: User | null): void => {
    user.value = data
  }

  async function getAuthenticatedUser() {
    const response = await authService.getAuthenticatedUser()
    setAuthenticatedUser(response.data.data as User)
  }

  async function login(payload: LoginRequest) {
    authService.login(payload)
    await getAuthenticatedUser()
  }

  async function logout() {
    const router = useRouter()
    await authService.logout()
    clearAuthenticatedUser()
    if (router.currentRoute.value.name != 'auth.login') {
      router.push({ name: 'auth.login' })
    }
  }

  async function register(payload: RegisterRequest) {
    const response = await authService.register(payload)
    setAuthenticatedUser(response.data as User)
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
    isAdmin,
    isGuest,
    login,
    logout,
    register,
    resetPassword,
    sendPasswordResetLink,
    setIsGuest,
    setUser,
    user
  }
})
