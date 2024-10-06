import './assets/css/main.css'
import '@/assets/css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'

import Button from 'primevue/button'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import ToastService from 'primevue/toastservice'
import Ripple from 'primevue/ripple'

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
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
  // theme: MyPreset
})
app.use(ToastService)

app.component('PrimeButton', Button)
app.component('PrimeCard', Card)
app.component('PrimeFloatLabel', FloatLabel)
app.component('PrimeInputText', InputText)
app.component('PrimeMessage', Message)

app.directive('ripple', Ripple)

app.mount('#app')
