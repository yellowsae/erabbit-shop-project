<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img v-if="val.picture" :src="val.picture" :title="val.name" @click="clickSpecs(item, val)"
            :class="{ selected: val.selected, disabled: val.disabled }" />
          <span v-else @click="clickSpecs(item, val)" :class="{ selected: val.selected, disabled: val.disabled }">
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<!-- <script lang="ts" setup>
import bwPowerSet from "@/vender/power-set"
import type {
  GoodsDetail,
  Sku,
  Spec,
  Value,
} from "./goods";
interface Props {
  goods: GoodsDetail;
}
const props = defineProps<Props>()

const clickSpecs = (item: any, val: any) => {
  // 1. 取消选中
  if (val.selected) {
    val.selected = false
  } else {
    // 2. 排他选中
    item.values.forEach(bv => { bv.selected = false })
    val.selected = true
  }
}
// 获取可走路径字典对象


// 处理可走路径字典对象
type PathMap = { [key: string]: string[] };

updateDisabledStatus(props.goods.specs, pathMap)
const pathMap = getPathMap(props.goods.skus);

type Skus = Sku[]
const spliter = "★";
// 根据skus数据得到路径字典对象
const getPathMap = (skus: Skus) => {
  // 0. 初始化可走路径字典对象为空对象
  const pathMap = {} as PathMap;
  // 1. 遍历 skus 集合
  skus.forEach((sku) => {
    // 2. 过滤出有库存有效的sku
    if (sku.inventory) {
      // 3. 得到sku属性值数组
      const specs = sku.specs.map((spec) => spec.valueName);
      // 4. 得到sku属性值数组的子集
      const powerSet = bwPowerSet(specs);
      // 5. 设置给路径字典对象
      powerSet.forEach((set) => {
        // 6. 处理成字符串方便查找
        const key = set.join(",");
        // 7. 如果还没有数组，创建一个空数组
        if (!pathMap[key]) {
          pathMap[key] = []
        }
        // 8. 已经有key往数组追加 skuid
        pathMap[key].push(sku.id);
      });
    }
  });
  return pathMap;
}



// 得到当前选中规格集合
const getSelectedArr = (specs: any) => {
  const arr = []
  specs.forEach(spec => {
    const obj = spec.values.find(val => val.selected)
    arr.push(obj ? obj.name : undefined)
  })
  return arr
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, index) => {
    // 先获取当前选中的规格集合
    const curr = getSelectedArr(specs)
    // 🔔 根据当前选中集合，模拟用户的下一次选中
    spec.values.forEach(val => {
      // 已经选中的，不用模拟
      if (val.selected) return
      // 模拟其他未选中的值，注意下标顺序要对应起来
      curr[index] = val.name
      // 过滤无效值，并最终得到key
      const key = curr.filter(v => v).join(star)
      // 根据 key 在字典从查找，最终设置禁用状态
      val.disabled = !pathMap[key]
    })
  })
}
</script> -->

<script lang="ts" >
import bwPowerSet from '@/vender/power-set'
// 自定义规格分隔符
const spliter = '★'
// 获取查询字典
const getPathMap = (skus: any) => {
  // 1. 得到所有的sku集合  props.goods.skus
  // 2. 从所有的sku中筛选出有效的sku
  // 3. 根据有效的sku使用power-set算法得到子集
  // 4. 根据子集往路径字典对象中存储 key-value
  const pathMap:any = {}
  // console.log(skus)
  // 遍历当前商品的所有 skus
  skus.forEach((sku: any) => {
    // 获取有库存的 sku
    if (sku.inventory) {
      // console.log('有库存的sku', sku)
      // PowerSet 算法处理规格所有组合
      const powerSetRes = bwPowerSet(sku.specs.map((item: any) => item.valueName))
      // console.log(powerSetRes, sku.id)
      // 处理成查询字典
      powerSetRes.forEach(item => {
        // console.log(item)
        // 字典的 key 处理成字符串
        const key = item.join(spliter)
        // console.log(key)
        // 如果没有加入过字典
        if (!pathMap[key]) {
          // 初始化一个数组，并放入第一个 skuid
          pathMap[key] = [sku.id]
        } else {
          // 已经存在，追加新的 skuid 进去即可
          pathMap[key].push(sku.id)
        }
      })
    }
  })
  // console.log(pathMap)
  // 注意：返回处理后的字典
  return pathMap
}

// 获取当前选中的规格的集合 - 用于模拟用户下一次的动作
const getSelectedArr = (specs: any) => {
  // console.log(specs)
  // 当前选中的规格的集合 ['颜色（名字）','产地（名字）','尺寸（名字）']
  const selectedArr: any = []
  // 遍历整个规格
  specs.forEach(spec => {
    // console.log(spec)
    // 找出选中是规格
    const obj = spec.values.find(item => item.selected)
    // console.log(obj.name)
    // 将 选中的规格名字 添加到 选中的规格的集合，没有选中的 undefined 表示
    selectedArr.push(obj ? obj.name : undefined)
  })
  // console.log(selectedArr)
  // 得到 当前选中的规格的集合
  return selectedArr
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // console.log(22, specs, pathMap)
  specs.forEach((spec, index) => {
    // console.log(spec, index)
    // 先获取当前选中的规格集合
    const selectedArr = getSelectedArr(specs)
    // console.log(11, selectedArr, spec, index)
    // 🔔 根据当前选中，模拟用户的下一次选中
    spec.values.forEach(item => {
      // 已经选中的按钮不用判断
      if (selectedArr[index] === item.name) return
      // 模拟其他未选中的值
      selectedArr[index] = item.name
      // console.log(22, selectedArr)
      // 过滤掉无效值并处理成字符串，用于查字典
      const key = selectedArr.filter(v => v).join(spliter)
      // console.log('模拟用户的下一次操作', key)
      // 查找字典中是否存在，不存在就处理成禁用状态
      item.disabled = !pathMap[key]
    })
  })
}

// 初始化选中状态（使商品默认选中的规格高亮）
const initSelectedStatus = (skuId, goods) => {
  // console.log(skuId, goods)
  // 根据 skuId 查询到商品中 默认选中的规格对象
  const defaultSpec = goods.skus.find(item => item.id === skuId)
  // console.log(defaultSpec)
  // 如果有这个 默认选中的规格对象
  if (defaultSpec) {
    // 遍历这个 默认选中的规格对象
    defaultSpec.specs.forEach((spec, index) => {
      // 根据规格对象的下标，找到商品中 规格名字
      const value = goods.specs[index].values.find(
        item => item.name === spec.valueName
      )
      // console.log(value)
      // 给找到的 规格名字，添加选中（高亮）效果
      value ? (value.selected = true) : (value.selected = true)
    })
  }
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    // 购物车页面需要根据 skuId 实现默认规格选择
    skuId: {
      type: String,
      default: ''
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    // 根据 skus 处理成查询字典
    const pathMap = getPathMap(props.goods.skus)
    // console.log(pathMap)

    // 根据传入的 skuId ，渲染 默认选中规格按钮
    initSelectedStatus(props.skuId, props.goods)

    // 组件初始化的时候更新禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)

    // 点击规格实现选中高亮效果
    const clickSpecs = (theItem, theVal) => {
      // console.log({ theItem, theVal })
      // 如果是禁用状态,不作为
      if (theVal.disabled) return
      // 如果没有 选中效果 属性
      if (!theVal.selected) {
        // 排他：清空所有的 选中效果 属性
        theItem.values.forEach(item => {
          item.selected = false
        })
        // 给当前点击的选项添加 高亮（选中效果）
        theVal.selected = true

        // 实现 根据选中的规格集合，获取对应的商品信息，并转递给父组件，更新页面商品信息
        const res = getSelectedArr(props.goods.specs)
        // console.log(res)
        // 如果规格集合中有 undefined，则表示规格还没选完整
        if (res.includes(undefined)) {
          // console.log(1, '规格还没选完整')
          emit('change', {})
        } else {
          // console.log(2, '规格选择完整', res)
          // 将完整的规格集合，转换成 pathMap字典 中  key 的字符串格式
          const key = res.join(spliter)
          // console.log(key)
          // 根据 key 在 pathMap字典 中查找对应的 skuid
          const [skuId] = pathMap[key]
          // console.log(skuId)
          // 根据 skuid 查找对应的商品信息(价格,旧价格,库存,规格文本)
          const obj = props.goods.skus.find(item => item.id === skuId)
          // console.log(obj)
          // 更新商品数据
          const data = {
            skuId: obj.id,
            inventory: obj.inventory,
            oldPrice: obj.oldPrice,
            price: obj.price,
            attrsText: obj.specs
              .map(({ name, valueName }) => `${name}: ${valueName}`)
              .join(' ')
          }
          // console.log(data)
          // 将更新后的商品数据专递给父组件，进行页面的数据渲染更新
          emit('change', data)
        }
      } else {
        emit('change', {})
        // 如果有 选中效果 属性，则去掉高亮
        theVal.selected = false
      }

      // 还要继续模拟下一次点击 (点击的时候更新禁用状态)
      updateDisabledStatus(props.goods.specs, pathMap)
    }

    return { clickSpecs }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
