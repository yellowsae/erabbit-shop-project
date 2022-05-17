<template >
  <!-- <nav>公共顶栏</nav> -->
  <AppTopNav />
  <!-- <header>公共头部</header> -->
  <AppHeader />
  <main>
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
</script>
<style lang="less">
  
</style>
