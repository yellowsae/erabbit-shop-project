<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script setup lang="ts">
import XtxSkeleton from '@/components/library/xtx-skeleton.vue'
defineProps({
  bg: {
    type: String,
    default: "#fff"
  }
})
</script>

<style lang="less" scoped>
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;

  .item {
    width: 306px;

    .xtx-skeleton~.xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}


</style>
