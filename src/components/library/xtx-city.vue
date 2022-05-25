<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()">
      <!--<span class="value">广东省 广州市 天河区</span>-->
      <span v-if="fullLocation" class="value">{{ fullLocation }}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="isShow">
      <div v-if="!currList.length" class="loading"></div>
      <span class="ellipsis" @click="changeItem(item)" v-for="item in currList" :key="item.code">{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue"
import axios from "axios"
import { onClickOutside } from "@vueuse/core"


defineProps({
  fullLocation: {
    type: String,
    default: ""
  }
})


const emit = defineEmits(["change"])
// 获取城市数据
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示

const getCityList = async () => {
  // 如果内存中有城市数据，直接返回
  if (window.cityList) {
    console.log('读取缓存中的数据')
    return window.cityList
  } else {
    // 内存中没有城市数据，发送请求，获取城市数据
    const { data } = await axios.get('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
    // 把数组存储到 window 对象中缓存起来
    window.cityList = data
    // console.log('网络请求获取')
    return data
  }
}


// 对城市的编码判断

const address = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: ''
})


const changeItem = (item: any) => {
  // 省份：level === 0
  if (item.level === 0) {
    address.provinceCode = item.code
    address.provinceName = item.name
  }
  // 市：level === 1
  else if (item.level === 1) {
    address.cityCode = item.code
    address.cityName = item.name
  }
  // 区/县：level === 2
  else if (item.level === 2) {
    address.countyCode = item.code
    address.countyName = item.name
    hide()
    address.fullLocation = `${address.provinceName} ${address.cityName} ${address.countyName}`
    emit('change', address)
  }
}


interface cityInter {
  areaList: Array<cityInter>,
  code: string,
  level: number,
  name: string,
}

const target = ref(null)

// 控制 city 面板显示框按钮
const isShow = ref(false)

const cityList = ref([])

// 获取城市数据,显示当前地方列表
// 2 显示和隐藏函数（为什么是函数，做更多事情）


// 定义计算属性，计算出当前所需展示的列表
const currList = computed<cityInter[]>(() => {
  // 省份
  let list = cityList.value

  // 城市
  if (address.provinceCode) {
    list = list.find(item => item.code === address.provinceCode).areaList
  }

  // 地区
  if (address.cityCode) {
    list = list.find(item => item.code === address.cityCode).areaList
  }
  return list
})


// 显示
const show = async () => {
  isShow.value = true
  // 盒子显示的时候获取城市信息，展示到页面中
  const data = await getCityList()
  cityList.value = data

  // 每次打开的时候都重新收集数据
  for (const key in address) {
    address[key] = ''
  }
}

// 隐藏
const hide = () => {
  isShow.value = false
  // 后面还有有其他业务
}

// 取反
const toggle = () => {
  isShow.value ? hide() : show()
}

// 点击目标元素之外  onClickOutside(目标元素,事件处理函数)
onClickOutside(target, () => {
  // 关闭
  hide()
})


</script>

<style lang="less" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;


    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }

    .value {
      color: #666;
      font-size: 12px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
