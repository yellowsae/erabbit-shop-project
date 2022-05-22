<template>
  <div class="xtx-carousel " @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item " v-for="(item, index) in sliders" :key="index" :class="{ fade: activeIndex === index }">
        <router-link :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="">
        </router-link>
      </li>
    </ul>
    <!-- 左边按钮 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <!-- 右边按钮 -->
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 底部的圆点 -->
    <div class="carousel-indicator">
      <!-- @click="activeIndex = index" 点击跳转 -->
      <span v-for="(item, index) in sliders" :key="index" @click="activeIndex = index"
        :class="{ active: activeIndex === index }"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted } from "vue"
const props = defineProps({
  sliders: {
    type: Array,
    default: () => []
  },
  // 自动轮播
  duration: {
    type: Number,
    default: 3000
  },
  autoPlay: {
    type: Boolean,
    default: false
  }
})

// 默认显示的图片的索引
const activeIndex = ref(0)

// 点击切换轮播图
const toggle = (step: number) => {
  const temp = activeIndex.value + step
  if (temp < 0) {
    activeIndex.value = props.sliders.length - 1
  } else if (temp > props.sliders.length - 1) {
    activeIndex.value = 0
  } else {
    activeIndex.value = temp
  }
}


// 自动轮播
let timer: number;

const autoPlayFn = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    toggle(1)
  }, props.duration)
}

watch(() => props.sliders, (newVal) => {
  // 超过一条数据 并且 开启自动播放，才调用自动播放函数
  if (newVal.length > 1 && props.autoPlay) {
    autoPlayFn()
  }
}, { immediate: true })



// 如果有自动播放，鼠标进入离开，暂停，开启
const stop = () => {
  if (timer) {
    clearInterval(timer)
  }
}

const start = () => {
  if (props.sliders.length && props.autoPlay) {
    autoPlayFn()
  }
}


// onUnmounted 当组件被销毁了时， 清理定时器
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="less" scoped>
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
