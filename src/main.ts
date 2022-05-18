import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
// 使用下载的样式文件
import "normalize.css"
import '@/assets/styles/common.less'



const app = createApp(App)

app.use(router).use(pinia)
app.mount('#app')
