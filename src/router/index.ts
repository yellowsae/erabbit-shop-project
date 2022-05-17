// TS 项目初始化路由
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    // 设置二级路由
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/category/:id', 
        component: () => import('@/views/category/index.vue')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/sub.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes
})


export default router
