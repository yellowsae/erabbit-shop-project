<template>
  <div class="top-category" v-if="cate">
    <div class="container">
      <!-- 面包屑导航 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="cate.name">{{ cate.name }}</XtxBreadItem>
        </transition>
      </XtxBread>

      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in cate.children" :key="item">
            <router-link :to="`category/sub/${item.id}`">
              <img :src="item.picture" alt="">
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in cate.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import XtxBread from "@/components/library/xtx-bread.vue"
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"
import XtxCarousel from "@/components/library/xtx-carousel.vue"
import XtxMore from '@/components/library/xtx-more.vue'
import GoodsItem from "./components/goods-item.vue"

import userType from "@/types/type"
import { findBanner } from "@/api/home"
import { ref, watch, onMounted } from "vue"
import { useRoute } from "vue-router"
import { findTopCategory } from "@/api/category"



// 轮播图数据
let sliders = ref<userType[]>([])
findBanner(2).then(({ result }) => {
  sliders.value = result
})


// 分类商品数据
interface cateInterface {
  name: string,
  id: string,
  children: userType[],
  picture?: string
}

// 获取一级分类数据
const route = useRoute()
const cate = ref<cateInterface[]>([])


// 分类商品-展示
// 根据切换路由的时候，根据分类ID获取数据，渲染分类商品。
const getCate = () => {
  findTopCategory(route.params.id).then(data => {
    cate.value = data.result
  })
}
watch(() => route.params.id, (newVal) => {
  // 如果不是一级分类页，就不发送一级分类请求
  // if (`/category/${id}` !== route.path) return
  newVal && getCate()
}, { immediate: true })


onMounted(() => {
  getCate()
})



</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}

.fade-right {

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateX(0);
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.5s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
