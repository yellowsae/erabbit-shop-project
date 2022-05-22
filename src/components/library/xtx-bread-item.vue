<template>
  <div class="xtx-bread-item">
    <router-link v-if="to" :to="to">
      <slot />
    </router-link>
    <span v-else>
      <slot />
    </span>
    <i class="iconfont icon-angle-right"></i>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: [String, Object]
  }
})
</script>

<style lang="less" scoped>
</style>
