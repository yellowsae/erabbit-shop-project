<template >
  <!-- <nav>公共顶栏</nav> -->
  <AppTopNav />
  <!-- <header>公共头部</header> -->
  <AppHeader />
  <main class="app-body">
    <!-- 主题的内容 -->
    <!-- 二级路由 -->
    <router-view />
  </main>
  <!-- <footer>公共底部</footer> -->
  <AppFooter />

</template>
<script lang="ts" setup>
import AppTopNav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import { onMounted } from 'vue'
// 初始化时， 获取数据
import { categoryStore } from "../store/modules/category"
const cStore = categoryStore()

onMounted(() => {
  cStore.getList()

})

</script>
<style lang="less">
.app-body {
  min-height: 600px;
}
</style>
