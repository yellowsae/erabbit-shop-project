<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a href="javascript:;">全部</a>
        <a href="javascript:;" v-for="p in item.properties" :key="p.id">{{ p.name }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, reactive } from 'vue'
import userType from '@/types/type'
// 获取数据
const subFilter = inject('subFilter'); // ref 类型数据

// const testList = subFilter?.value.saleProperties
// 🔔 筛选区的列表数据其实包含两部分：品牌数据 + 销售规格
const list = computed(() => {
  return [
    // 品牌数据 - 参考销售规格的格式组装数据
    { id: 'brands', name: '品牌', properties: subFilter.value.brands },
    // 销售规格 - 已这个格式为主要
    ...subFilter?.value.saleProperties
  ]
})


</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
