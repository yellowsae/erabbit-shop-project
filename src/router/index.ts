// TS 项目初始化路由
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    // 设置二级路由
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
