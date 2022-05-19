<template>
  <!-- 查看更多全局组件实现 -->
  <router-link :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </router-link>
</template>

<script lang="ts" setup>

// 调用上层传入的  path 参数
const props = defineProps({
  path: {
    type: String,
    default: "/"
  }
})
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.xtx-more {
  margin-bottom: 2px;

  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }

  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }

  &:hover {

    span,
    i {
      color: @xtxColor;
    }
  }
}
</style>
