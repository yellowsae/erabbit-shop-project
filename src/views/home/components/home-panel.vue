<template>
  <!-- 定义首页需要的面板组件 -->
  <!-- 比如 新鲜好物， 人气推荐的面板 -->
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <!-- 使用插槽 -->
        <slot name="right">
          <!-- 填充 xtx-more.vue 组件 -->
        </slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  subTitle: {
    type: String,
    default: ""
  }
})
</script>

<style lang="less" scoped>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
