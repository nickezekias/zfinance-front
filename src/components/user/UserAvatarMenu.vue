<script setup lang="ts">
import { ref } from 'vue';
import PrimeAvatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const items = ref([
  {
    label: t('labels.profile'),
    icon: 'pi pi-user',
    command: () => { router.push({ name: 'profile.index' }) }
  },
  {
    label: t('labels.logout'),
    icon: 'pi pi-sign-out',
    command: async () => { logout() }
  },
])

const menu = ref()

const toggle = (event: Event) => {
    menu.value.toggle(event);
};

async function logout() {
  await authStore.logout()
}
</script>

<template>
  <div>
    <PrimeButton type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
      text rounded>
      <PrimeAvatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        style="width: 2.2rem; height: 2.2rem" />

      <Menu ref="menu" class="bg-white dark:bg-surface-950" id="overlay_menu" :model="items" :popup="true" />
    </PrimeButton>

  </div>
</template>