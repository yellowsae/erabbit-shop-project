<template>
  <div class='xtx-bread'>
    <slot />
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" >
@import "@/assets/styles/variables.less";

.xtx-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all .4s;

      &:hover {
        color: @xtxColor;
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
