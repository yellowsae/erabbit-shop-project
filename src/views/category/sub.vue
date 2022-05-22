<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑导航 -->
      <SubBread />
      <!-- 筛选分区 -->
      <SubFilter />
      <!-- 商品分区 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import SubBread from "./components/sub-bread.vue"
import SubFilter from "./components/sub-filter.vue"


import { findSubFilter } from "@/api/category"
import { useRoute } from "vue-router"
import { ref, watch, provide } from "vue"


const route = useRoute()  // 初始化， 用过 useRouter 获取 path 的ID
const subFilter = ref(null)

// 🔔 watch 监听 id 发生变化，需要重新发送请求
watch(() => route.params.id, async (id) => {
  // 如果不是二级分类页，就不发送请求
  if (route.path !== `/category/sub/${id}`) return

  // 发送请求接口调用
  const { result } = await findSubFilter(id)
  subFilter.value = result
}, { immediate: true })

// 🎉提供数据：provide('key', value)
// 🎉获取数据：const value = inject('key')

provide('subFilter', subFilter)


</script>

<style lang="less" scoped>
</style>
