<template>
  <div class="xtx-home-page">
    这是Home 组件
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
// 引入主题色
@import "../../assets/styles/variables.less";
.xtx-home-page {
  // 使用主题定义的颜色
  color: @xtxColor;
}
</style>
