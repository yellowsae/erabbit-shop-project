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
      // 配置路由和组件实现跳转,  根据路由在组件中跳转， 传递过来的参数
      {
        path: '/category/:id',
        component: () => import('@/views/category/index.vue')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/sub.vue')
      }
    ],
  },

  {
    path: '/test',
    component: () => import('@/views/test/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})


export default router
