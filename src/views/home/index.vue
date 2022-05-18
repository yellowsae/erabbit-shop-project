<template>
  <div class="page-home">
    <div class="home-entry">
      <!-- 在 main中引入总体的样式中 具有  container 的样式， 默认是居中的-->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HomeCategory from './components/home-category.vue';
</script>

<style lang="less" scoped>
</style>
