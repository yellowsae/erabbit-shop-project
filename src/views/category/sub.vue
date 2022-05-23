<template>
  <transition name="fade">
    <div class="sub-category" v-if="subFilter">
      <div class="container">
        <!-- 面包屑导航 -->
        <SubBread />
        <!-- 筛选分区 -->
        <!-- <SubFilter :newSubFilter="subFilter"/> -->
        <!-- 商品分区 -->
      </div>
    </div>
    <SubSkeleton v-else></SubSkeleton>
  </transition>

</template>

<script lang="ts" setup>
import SubBread from "./components/sub-bread.vue"
// import SubFilter from "./components/sub-filter.vue"
import SubSkeleton from "./components/sub-skeleton.vue"


import { findSubFilter } from "@/api/category"
import { useRoute } from "vue-router"
import { ref, watch, provide } from "vue"


const route = useRoute()  // 初始化， 用过 useRouter 获取 path 的ID
const subFilter = ref<any>([])

// 🔔 watch 监听 id 发生变化，需要重新发送请求
watch(() => route.params.id, async (id) => {
  // 如果不是二级分类页，就不发送请求
  if (route.path !== `/category/sub/${id}`) return
  // 切换分类时，清空数据，让页面展示骨架效果
  subFilter.value = null
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
