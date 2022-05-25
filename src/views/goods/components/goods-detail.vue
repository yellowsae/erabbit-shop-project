<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="i in 1" :key="i">
        <span class="dt">品牌</span>
        <span class="dd">网易严选推荐选品，本产品为鸿星尔克品牌，由国货之光鸿星尔克生产</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img src="https://yanxuan-item.nosdn.127.net/8334cda78df187450368e1e8cb22e61e.jpg">
    <img src="https://yanxuan-item.nosdn.127.net/6502b98072574531302d69423c1344ce.jpg">
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 100%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}
</style>
