import axios from '@/lib/axios'
import type { LoginRequest, PasswordResetRequest } from '@/@types/auth.interface'

const getAuthenticatedUser = function () {
  return axios.get("/api/v1/admin/users/auth");
};

const login = async function(payload: LoginRequest ) {
  await axios.get("/sanctum/csrf-cookie")
  return axios.post('/api/v1/admin/login', payload)
}

const logout = function() {
  return axios.post('/api/v1/admin/logout')
}

const resetPassword = async function(payload: PasswordResetRequest) {
  await axios.get("/sanctum/csrf-cookie")
  return axios.post('/api/v1/admin/reset-password', payload)
}

const sendPasswordResetLink = async function(payload: string) {
  await axios.get("/sanctum/csrf-cookie")
  return axios.post(`/api/v1/admin/forgot-password?email=${payload}`)
}

export default { getAuthenticatedUser, login, logout, resetPassword, sendPasswordResetLink }