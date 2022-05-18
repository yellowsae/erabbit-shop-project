<template>
  <div class="home-category">
    <ul class="menu">
      <!-- 循环 li 做轮播图的展示 -->
      <li v-for="item in menuList" :key="item.id">
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
        <template v-for="sub in item.children" :key="sub.id">
          <router-link :to="`/category/sub/${sub.id}`">{{sub.name}}</router-link>
        </template>
      </li>
    </ul>
  </div>

  <!-- 左侧分类-弹层展示 -->
  <div class="layer">
    
  </div>
</template>

<script lang="ts" setup>
import { categoryStore } from "../../../store/modules/category"
import { reactive, computed } from 'vue'
const cStore = categoryStore();

// 1. 获取vuex的一级分类，并且只需要两个二级分类
// 2. 需要在组件内部，定义一个品牌数据
// 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
// 4. 进行渲染即可

const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-chilren', name: '品牌推荐' }]
})

// 用于在模板中循环的数组 
const menuList = computed(() => {
  // 获取一级分类， 并循环
  const arr = cStore.list.map(item => {
    // 返回一个对象， 模拟 Pinia 中定义品牌数据
    return {
      id: item.id,
      name: item.name,
      // 防止初始化没有children的时候调用slice函数报错
      children: item.children && item.children.slice(0, 2)
      // 只获取 item.children.slice(0, 2)  子类的 前两个
    }
  })
  // 将定义的 品牌推荐 追加到 数组最后
  arr.push(brand)
  return arr
})
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.home-category {
  width: 250px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &:hover {
        background-color: @xtxColor;
      }

      a {
        color: #fff;
        margin-right: 4px;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
