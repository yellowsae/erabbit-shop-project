<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem :to="`/category/${subFilter.parentId}`">{{ subFilter.parentName }}</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="subFilter.name">{{ subFilter.name }}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>

<script lang="ts" setup>
import XtxBread from "@/components/library/xtx-bread.vue"
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"
import { inject } from "vue"

const subFilter = inject("subFilter")
</script>

<style lang="less" scoped>
</style>
