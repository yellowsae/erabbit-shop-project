<template>
  <div class="goods-tabs">
    <nav>
      <a @click="activeCom = 'GoodsDetail'" :class="{ active: activeCom === 'GoodsDetail' }"
        href="javascript:;">商品详情</a>
      <a @click="activeCom = 'GoodsComment'" :class="{ active: activeCom === 'GoodsComment' }"
        href="javascript:;">商品评价<span> (111) </span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="activeCom" ></component>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import GoodsComment from './goods-comment.vue'
import GoodsDetail from './goods-detail.vue'
import { inject } from 'vue'
export default {
  components: { GoodsDetail, GoodsComment },
  name: 'GoodsTabs',
  setup() {
    // 默认展示商品详情组件，GoodsDetail 商品详情，GoodsComment 商品评价
    const activeCom = ref('GoodsDetail')
    return { activeCom }
    const goods = inject('goods')

    return { goods }
  }
}

</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
