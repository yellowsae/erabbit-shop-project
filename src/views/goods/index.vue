<template>
  <!-- 配置商品详情 -->
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/">手机</XtxBreadItem>
        <XtxBreadItem to="/">华为</XtxBreadItem>
        <XtxBreadItem to="/">p30</XtxBreadItem>
      </XtxBread>

      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 商品信息左边 -->
        <div class="goods-info-left">

        </div>
        <!-- 商品信息右边 -->
        <div class="goods-info-right">

        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />

      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品 + 评价 -->
          <div class="goods-tabs">
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import XtxBread from "@/components/library/xtx-bread.vue"
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"
import GoodsRelevant from "./components/goods-relevant.vue"
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background-color: #fff;
  display: flex;

  .goods-info-left {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .goods-info-right {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;

    .goods-tabs {
      min-width: 600px;
      background-color: #fff;
    }

    .goods-warn {
      min-width: 600px;
      background: #fff;
      margin-top: 20px;
    }
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }

}
</style>
