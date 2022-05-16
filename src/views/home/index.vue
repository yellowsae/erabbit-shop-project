<template >
  <h2>
    这是Home 组件
  </h2>
  <!-- 1. 使用根模块state的数据   -->
  <h2>{{ pStore.username }}</h2>
  <!-- 2. 使用根模块getters的数据   -->
  <p>{{ pStore.newName }}</p>
  <button @click="pStore.updateName">changName</button>
  <button @click="pStore.updateNameSync">异步修改Name</button>


  <hr>

  <h2>{{uStore.profile.account}}</h2>

</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { piniaStore } from "../../store/pinia-test"
import { userStore } from "../../store/modules/user"
// 组件中使用 Pinia

const pStore = piniaStore();
const uStore = userStore()
</script>
<style lang="less">
</style>
