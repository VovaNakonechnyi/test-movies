import '@/assets/main.scss'
import { debounce } from 'ts-debounce'
import { createApp } from 'vue'

import { createPinia } from 'pinia'
import { PiniaDebounce } from '@pinia/plugin-debounce'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(PiniaDebounce(debounce))
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
