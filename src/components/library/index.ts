// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意点：Vue3没有全局过滤器。
import XtxSkeleton from './xtx-skeleton.vue'
// 全局注册轮播图 
import XtxCarousel from './xtx-carousel.vue'
import defaultImg from '@/assets/images/200.png'

// 注册面包屑组件
import XtxBread from "./xtx-bread.vue"
import XtxBreadItem from "./xtx-bread-item.vue"
import { useIntersectionObserver } from '@vueuse/core'


// 引入 显示更多组件
import XtxMore from './xtx-more.vue'


// 指令
const defineDirective = (app: any) => {
  app.directive('lazy', {
    // 标签或组件挂载到页面中（就是 Vue2 insert 插入节点）
    mounted (el: any, { value }) {
      // stop 是一个函数，用于停止检测元素可见性
      const { stop } = useIntersectionObserver(
        el,
        // isIntersecting 布尔值，元素可见为 true，元素不可见为 false
        ([{ isIntersecting }], observerElement) => {
          // 图片标签是否可见
          if (isIntersecting) {
            // 如果目标可见，替换图片地址，自动加载图片
            el.src = value
            // 如果图片地址是错误的，无法加载图片，显示占位图
            el.onerror = () => {
              el.src = defaultImg
            }
            // 主动停止检测元素可见性
            stop()
          }
        },
        { threshold: [0] }
      )
    }
  })
}

// 导出
export default {
  // install 这种写法以后是提供给 app.use() 安装组件库用的
  install(app: any) {
    // Vue3 全局注册组件
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem)
    defineDirective(app)
  }
}
