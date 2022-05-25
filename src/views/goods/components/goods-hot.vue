<template>
  <div class="goods-hot">
    <h3 v-if="type === 1">24小时热销榜</h3>
    <h3 v-else-if="type === 2">热销周榜</h3>
    <h3 v-else-if="type === 3">热销总榜</h3>
    <GoodsItem :goods="item" v-for="item in list" :key="item.id"></GoodsItem>
  </div>
</template>
<script lang="ts" setup>
import GoodsItem from '@/views/category/components/goods-item.vue'
import { findHotGoods } from "@/api/goods"
import { ref } from 'vue'
const props = defineProps({
  type: {
    type: Number,
    default: 1
  },
  goodsId: {
    type: String,
    default: ""
  }
})

const list = ref([])
findHotGoods({ id: props.goodsId, type: props.type }).then(({ result }) => {
  list.value = result
})
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
