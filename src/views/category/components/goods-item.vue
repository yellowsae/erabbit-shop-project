<template>
  <!-- 目的： 展示各个子级分类下推荐的商品基础布局 -->
  <router-link :to="`/product/${goods.id}`" class="goods-item">
    <img :src="goods.picture" alt="">
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </router-link>
</template>

<script lang="ts" setup>
defineProps({
  goods: {
    type: Object,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  // .hoverShadow();

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
