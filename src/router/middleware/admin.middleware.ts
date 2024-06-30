import { useAuthStore } from "@/stores/auth.store";

export default function admin({ next }: any) {
  const authStore = useAuthStore()
  if (authStore.isAdmin()) {
    next()
  } else {
    next({ name: 'notFound' })
  }
}