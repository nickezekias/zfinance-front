import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'

import Button from 'primevue/button'

const app = createApp(App, {
  setup() {
    const { t } = useI18n()
    return { t }
  }
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})

app.component('PrimeButton', Button)

app.mount('#app')
