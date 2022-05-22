<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a href="javascript:;" @click="moveX = '0'" :class="{ disabled: moveX === '0' }"
        class="iconfont icon-angle-left prev"></a>
      <a href="javascript:;" @click="moveX = '-50%'" :class="{ disabled: moveX === '-50%' }"
        class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <transition name="fade" mode="out-in">
        <ul class="list" v-if="list.length" :style="`transform: translateX(${moveX});`">
          <li v-for="item in list" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="">
            </router-link>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" width="240px" height="305px" bg="#e4e4e4"></XtxSkeleton>
        </div>
      </transition>

    </div>
  </HomePanel>
</template>

<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
import userType from "./type";
import XtxSkeleton from "@/components/library/xtx-skeleton.vue"



const list = ref<userType[]>([])
// 切换效果，所需坐标
const moveX = ref<any>(0)
// 获取数据
findBrand().then(({ result }) => {
  list.value = result
})

</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.home-panel {
  background: #f5f5f5
}

.iconfont {
  width: 20px;
  height: 20px;
  background-color: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}


.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
