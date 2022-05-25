<template>
  <div class='goods-relevant'>
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :sliders="sliders" style="height:380px" auto-play />
  </div>
</template>

<script lang="ts" setup>
import XtxCarousel from "@/components/library/xtx-carousel.vue"
import { findRelGoods } from "@/api/goods"
import { ref } from 'vue'

const useRelGoodsData = (id: any) => {
  const sliders = ref([])
  findRelGoods(id).then(data => {
    // 每页4条
    const size = 4
    const total = Math.ceil(data.result.length / size)
    for (let i = 0; i < total; i++) {
      sliders.value.push(data.result.slice(i * size, (i + 1) * size))
    }
  })
  return sliders
}


const props = defineProps({
  goodsId: {
    type: String,
    default: undefined
  }
})

const sliders = useRelGoodsData(props.goodsId)
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;

  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;

    .title {
      font-size: 20px;
      padding-left: 10px;
    }

    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
</style>
