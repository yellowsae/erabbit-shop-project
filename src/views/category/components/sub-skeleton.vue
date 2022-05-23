<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑骨架 -->
      <div class="sub-bread">
        <XtxSkeleton class="item" width="200px" height="22px" />
      </div>
      <!-- 筛选分区骨架 -->
      <div class="sub-filter">
        <XtxSkeleton class="item" width="800px" height="40px" />
        <XtxSkeleton class="item" width="800px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import XtxSkeleton from "@/components/library/xtx-skeleton.vue"
</script>

<style lang="less" scoped>
.sub-category{
  min-height: 1000px;
  background-color: #f5f5f5;
}
.sub-bread {
  display: flex;
  padding: 25px 10px;
}
.sub-filter {
  background: #fff;
  padding: 25px;
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
