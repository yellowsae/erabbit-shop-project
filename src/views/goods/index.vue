<template>
  <!-- 配置商品详情 -->
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑导航 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[1].id">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub' + goods.categories[0].id">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem to="/">{{ goods.name }}</XtxBreadItem>
      </XtxBread>

      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 商品信息左边 -->
        <div class="goods-info-left">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />

        </div>
        <!-- 商品信息右边 -->
        <div class="goods-info-right">
          <!-- 名字区组件 -->
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" />

          <XtxNumbox label="数量" v-model="count" :max="goods.inventory" />
          <!-- 添加购物车按钮 -->
          <XtxButton type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />

      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品 + 评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import XtxBread from "@/components/library/xtx-bread.vue"
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"
import GoodsRelevant from "./components/goods-relevant.vue"
import GoodsImage from "./components/goods.image.vue"
import GoodsSales from "./components/goods-sales.vue"
import GoodsName from "./components/goods-name.vue"
import GoodsSku from "./components/goods-sku.vue"
import XtxNumbox from "@/components/library/xtx-numbox.vue"
import XtxButton from "@/components/library/xtx-button.vue"
import GoodsTabs from "./components/goods-tabs.vue"
import GoodsHot from "./components/goods-hot.vue"
import GoodsWarn from "./components/goods-warn.vue"


// 引入的函数
import { findGoods } from "@/api/goods"
import { useRoute } from "vue-router"
import { ref, watch, nextTick, reactive, provide } from "vue"
import userType from "@/types/type"

const goods = ref<userType[]>([])
const route = useRoute()
const count = ref(1)
const testInfo = ref('')
// 注意单页面应用路由变化，需要重新获取商品详情
watch(() => route.params.id, async (id) => {
  // 如果不是商品详情页不处理
  if (route.path !== `/product/${id}`) return
  const { result } = await findGoods(id)
  goods.value = result
  count.value = 1
  provide('goods', goods)
}, { immediate: true })

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

    // .goods-tabs {
    //   min-width: 600px;
    //   background-color: #fff;
    // }

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
