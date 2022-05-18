// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意点：Vue3没有全局过滤器。
import XtxSkeleton from './xtx-skeleton.vue'
export default {
  // install 这种写法以后是提供给 app.use() 安装组件库用的
  install(app: any) {
    // Vue3 全局注册组件
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}
