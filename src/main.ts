import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'

const app = createApp(App, {
  setup() {
    const { t } = useI18n()
    return { t }
  }
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
