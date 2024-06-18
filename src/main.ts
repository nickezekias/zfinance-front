import './assets/css/main.css'
import '@/assets/css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'

import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import ToastService from 'primevue/toastservice'
import { definePreset } from '@primevue/themes'

const app = createApp(App, {
  setup() {
    const { t } = useI18n()
    return { t }
  }
})

const MyPreset = definePreset(Aura, {
  semantic: {
    focusRing: {
      width: '2px',
      style: 'dashed',
      color: '{primary.color}',
      offset: '1px'
    }
  },
  options: {
    cssLayer: {
      name: 'primevue',
      order: 'tailwind-base, primevue, tailwind-utilities'
    }
  }
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  ripple: true,
  /* theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  } */
  theme: MyPreset
})
app.use(ToastService)

app.component('PrimeButton', Button)
app.component('PrimeFloatLabel', FloatLabel)
app.component('PrimeInputText', InputText)

app.mount('#app')
