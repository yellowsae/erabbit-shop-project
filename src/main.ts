import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
// 使用下载的样式文件
import "normalize.css"
import '@/assets/styles/common.less'

// 导入自己封装的组件库
import XtxUI  from './components/library'


const app = createApp(App)

app.use(router).use(pinia).use(XtxUI)
app.mount('#app')
