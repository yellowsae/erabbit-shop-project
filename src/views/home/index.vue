<template>
  <div class="page-home">
    <div class="home-entry">
      <!-- 在 main中引入总体的样式中 具有  container 的样式， 默认是居中的-->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>

    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 商品区域 -->
    <HomeProduct />
    <!-- 最近专题 -->
    <HomeSpecial />
  </div>
</template>

<script lang="ts" setup>
import HomeCategory from './components/home-category.vue';
// 轮播图
import HomeBanner from './components/home-banner.vue';
import HomeBrand from './components/home-brand.vue';

// 新鲜好物主题内容
import HomeNew from './components/home-new.vue';
import HomeHot from './components/home-hot.vue';
import HomeProduct from './components/home-product.vue';
import HomeSpecial from './components/home-special.vue';
</script>

<style lang="less" scoped>
</style>
