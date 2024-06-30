import { useAuthStore } from '@/stores/auth.store';
import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true
})

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const authStore = useAuthStore()
    if (
      error.response &&
      [401, 419].includes(error.response.status)
    ) {
      await authStore.logout()
    }
    return Promise.reject(error);
  }
);

export default axios
