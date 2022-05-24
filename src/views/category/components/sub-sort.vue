<template>
  <div class='sub-sort'>
    <div class="sort">
      <a :class="{ active: reqParams.sortField === undefined }" @click="changeSort()" href="javascript:;">
        默认排序
      </a>
      <a :class="{ active: reqParams.sortField === 'publishTime' }" @click="changeSort('publishTime')"
        href="javascript:;">
        最新商品
      </a>
      <a :class="{ active: reqParams.sortField === 'orderNum' }" @click="changeSort('orderNum')" href="javascript:;">
        最高人气
      </a>
      <a :class="{ active: reqParams.sortField === 'evaluateNum' }" @click="changeSort('evaluateNum')"
        href="javascript:;">
        评论最多
      </a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i :class="{ active: reqParams.sortMethod === 'asc' }" class="arrow up" />
        <i :class="{ active: reqParams.sortMethod === 'desc' }" class="arrow down" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="reqParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="reqParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script lang="ts" setup>
import XtxCheckbox from "@/components/library/xtx-checkbox.vue"
import { inject } from "vue"

const reqParams = inject('reqParams')

const changeSort = (sortField: any) => {
  // 1.0 先收集排序方式
  reqParams.sortField = sortField
  if (sortField === 'price') {
    // 2.0 收集价格排序规则
    reqParams.sortMethod = reqParams.sortMethod === 'asc' ? 'desc' : 'asc'
  } else {
    // 如果不是价格字段，不需要设置价格排序规则
    // sortParams.sortMethod = null
    // 💥 不是价格字段，删除掉属性价格排序属性
    delete reqParams.sortMethod
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
