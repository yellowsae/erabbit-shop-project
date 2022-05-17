<template>
  <ul class="app-header-nav">
    <li class="home">
      <router-link to="/">首页</router-link>
    </li>
    <li v-for="item in list" :key="item.id">
      <router-link to="/">{{ item.name }}</router-link>
      <!-- 列表下的img -->
      <div class="layer">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link to="/">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { categoryStore } from "../store/modules/category"
// list 的类型
// import { ICategory } from "../utils/type"
import { storeToRefs } from "pinia"
const cStore = categoryStore()


// let lists = ref([])
// 使用 category 中的数据
// lists.value = computed(() => cStore.list)
const { list } = storeToRefs(cStore)

</script>

<style lang="less" scoped>
@import "../assets/styles/variables.less";

.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  >li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    >a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      >a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      // 子分类
      >.layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}


// 子分类

.layer {
  width: 1240px;
  background: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        P {
          color: @xtxColor
        }
      }
    }
  }
}
</style>
