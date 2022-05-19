<template>
  <!-- -首页主体-新鲜好物 -->
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <transition name="fade">
        <!-- 面板内容 -->
        <ul class="goods-list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="">
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </router-link>
          </li>
        </ul>
        <XtxSkeleton v-else />
      </transition>
    </HomePanel>
  </div>
</template>

<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import XtxMore from '@/components/library/xtx-more.vue'
import XtxSkeleton from '@/components/library/xtx-skeleton.vue'
import { findNew } from "../../../api/home"
import { ref } from 'vue'
/**
 * 大致步骤：
    进行组件基础布局
    封装API调用接口
    调用接口渲染组件
 */
const list = ref([])
findNew().then(res => {
  list.value = res.result
})

</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}

.fade {
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity 0.5s 0.2s;
      z-index: 1;
    }

    &-to {
      opacity: 0;
    }
  }
}
</style>
