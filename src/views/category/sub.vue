<template>
  <transition name="fade">
    <div class="sub-category" v-if="subFilter">
      <div class="container">
        <!-- 面包屑导航 -->
        <SubBread />
        <!-- 筛选分区 -->
        <SubFilter :newSubFilter="subFilter"/>
        <!-- 结果区域 -->
        <div class="goods-list">
          <!-- 排序 -->
          <SubSort />
          <!-- 商品列表 -->
          <ul class="list">
            <li v-for="item in list" :key="item.id">
              <GoodsItem :goods="item" />
            </li>
          </ul>
          <!-- 加载 -->
          <XtxInfiniteLoading :loading="loading" :finished="finished" @load="onLoad" />
        </div>
      </div>
    </div>
    <SubSkeleton v-else></SubSkeleton>
  </transition>

</template>

<script lang="ts" setup>
import SubBread from "./components/sub-bread.vue"
import SubFilter from "./components/sub-filter.vue"
import SubSkeleton from "./components/sub-skeleton.vue"
import SubSort from "./components/sub-sort.vue"
import GoodsItem from "./components/goods-item.vue"
import XtxInfiniteLoading from "@/components/library/xtx-infinite-loading.vue"



import { findSubFilter, findCategoryGoods } from "@/api/category"
import { useRoute } from "vue-router"
import { ref, watch, provide, reactive } from "vue"


const route = useRoute()  // 初始化， 用过 useRouter 获取 path 的ID
const subFilter = ref<any>([])

// 页码独立维护const page = ref(1)
const page = ref(1)
// 加载中状态
const finished = ref(false)
// 加载结束状态
const loading = ref(false)


// // 用于商品列表--分页查询接口的请求参数
const reqParams = reactive({
  categoryId: '',
  sortField: undefined,
  sortMethod: undefined,
  inventory: false,
  onlyDiscount: false,
})

// 父组件提供的是响应式对象，子组件内部可以直接修改
provide('reqParams', reqParams)



// 🔔 watch 监听 id 发生变化，需要重新发送请求
watch(() => route.params.id, async (id) => {
  // 如果不是二级分类页，就不发送请求
  if (route.path !== `/category/sub/${id}`) return
  // 切换分类时，清空数据，让页面展示骨架效果
  // 💥 分类id为必传参数，当二级分类 id 有变化，请求参数也需要更新
  reqParams.categoryId = id
  subFilter.value = null
  // 发送请求接口调用
  const { result } = await findSubFilter(id)
  subFilter.value = result
}, { immediate: true })

// 🎉提供数据：provide('key', value)
// 🎉获取数据：const value = inject('key')

provide('subFilter', subFilter)



// 根据请求参数获取商品列表数据
const list = ref([])

watch(reqParams, async () => {
  // 重置加载结束状态
  finished.value = false
  // 重置页码
  page.value = 1
  // 根据请求参数获取商品列表
  const { result } = await findCategoryGoods({ ...reqParams, page: page.value })
  list.value = result.items
}, { immediate: true })


// 自定义加载事件，加载分页数据
const onLoad = async () => {
  // 请求前 - 显示加载中
  loading.value = true
  // 页码要加1
  page.value++
  // 请求中 - 发送请求加载数据
  const { result } = await findCategoryGoods({ ...reqParams, page: page.value })
  // 请求完成 - 隐藏加载中
  loading.value = false
  // 💥加载更多是数据的追加，注意展开后再追加，否则就是数组内嵌套数组了
  list.value.push(...result.items)
  // 判断数据是否已经加载完毕，如果加载完毕就 finished 设置为 true
  if (result.items.length < reqParams.pageSize) {
    finished.value = true
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background-color: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
