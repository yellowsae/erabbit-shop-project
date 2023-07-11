<template>
  <div class="goods-image">
    <div class="large" v-show="!isOutside">
      <img :src="images[activeIndex]" alt="" :style="largePos">
    </div>
    <div class="middle" ref="target">
      <img :src="images[activeIndex]" alt="">
      <div class="layer" v-show="!isOutside" :style="layerPos"></div>
    </div>
    <ul class="small">
      <li v-for="(item, index) in images" :key="index">
        <img @mouseenter="activeIndex = index" :src="item" alt="">
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useMouseInElement } from '@vueuse/core'
const props = defineProps({
  images: {
    type: Object,
    default: () => []
  }
})

const activeIndex: any = ref(0)

// 需要获取鼠标坐标的目标盒子
const target = ref(null)
// isOutside            表示目标元素外面/里面
// elementX/elementY    鼠标在盒子内的坐标
const { isOutside, elementX, elementY } = useMouseInElement(target)

// 定义响应式数据，更新数据的时候更新视图
const layerPos = reactive({ left: '0', top: '0' })
const largePos = reactive({ left: '0', top: '0' })

// 监听鼠标的两个坐标值
watch([elementX, elementY], () => {
  // -100  =>  让盒子和鼠标的中心对齐
  let left = elementX.value - 100
  let top = elementY.value - 100

  // 盒子的边界判断，左上右下的四个边界都要判断
  if (left < 0) left = 0
  if (top < 0) top = 0
  if (left > 200) left = 200
  if (top > 200) top = 200

  // 样式需要加 px 单位
  layerPos.left = left + 'px'
  layerPos.top = top + 'px'

  // 大图移动
  // -1   =>  反向移动
  // 2    =>  小图和大图的比例是 1:2 倍
  largePos.left = -1 * 2 * left + 'px'
  largePos.top = -1 * 2 * top + 'px'
})

</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  // 大图预览
  .large {
    z-index: 500;
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
    overflow: hidden;

    img {
      max-width: 800px;
      max-height: 800px;
      width: 800px;
      height: 800px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .middle {
    width: 400px;
    height: 400px;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
