<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #right>
      <XtxMore path="/" />
    </template>
    <ul ref="pannel" class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <router-link to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </router-link>
      </li>
    </ul>
  </HomePanel>
</template>

<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import XtxMore from '@/components/library/xtx-more.vue'
import { findHot } from "../../../api/home"
import { ref } from "vue"

interface hotListInter<T = string> {
  alt: T,
  id: T,
  picture: T,
  title: T
}
const hotList = ref<hotListInter[]>([])

findHot().then(res => {
  hotList.value = res.result
})

</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    // .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
