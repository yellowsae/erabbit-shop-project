<template >
  <h2>
    这是 Test 组件; 用来设置数据
  </h2>
  <!-- 1. 使用根模块state的数据   -->
  <h2>{{ pStore.username }}</h2>
  <!-- 2. 使用根模块getters的数据   -->
  <p>{{ pStore.newName }}</p>
  <button @click="pStore.updateName">changName</button>
  <button @click="pStore.updateNameSync">异步修改Name</button>


  <hr>

  <h2>{{ uStore.profile.account }}</h2>

  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem to="/category/1010000">一级分类</XtxBreadItem>
    <XtxBreadItem>二级分类</XtxBreadItem>
  </XtxBread>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { piniaStore } from "../../store/pinia-test"
import { userStore } from "../../store/modules/user"
// 组件中使用 Pinia

// 测试使用  面包屑组件 -  组件组测出现问题
import XtxBread from "@/components/library/xtx-bread.vue"
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"

const pStore = piniaStore();
const uStore = userStore()
</script>
<style lang="less">
</style>
