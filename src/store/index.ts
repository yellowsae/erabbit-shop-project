import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist' 

const pinia = createPinia();
pinia.use(piniaPluginPersist) // 使用 Pinia 数据持久化插件

export default pinia;
