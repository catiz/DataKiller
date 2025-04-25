import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import i18n from './locales'

const app = createApp(App)
app.use(TDesign)
app.use(i18n)
app.mount('#app')
