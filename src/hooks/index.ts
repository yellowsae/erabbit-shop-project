// hooks(钩子)封装逻辑，提供响应式数据。
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface goodsList<T = string> {
  desc: T,
  discount?: T,
  id: T,
  name: T,
  orderNum: number,
  picture: T,
  price: T

}

// 数据懒加载函数
export const useLazyData = (apiFn: any) => {
  // 1. 被观察的对象
  const target = ref(null)
  // 2. 用于存放后台数据的变量
  const list = ref<goodsList[]>([])
  // stop             用于停止检测函数
  // target           被检测的元素
  // isIntersecting   布尔值，元素是否可见 true/false
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // 如果元素可以，发送请求获取数据，并停止检测避免重复发送请求
      if (isIntersecting) {
        console.log(target.value, '元素可见可以发请求了.....')
        // 调用 API 获取数据
        apiFn().then(data => {
          list.value = data.result
        })
        stop()
      }
    },
  )
  // 钩子函数返回---> 响应式数据（目标元素, 后台数据）
  return { list, target }
}
