<template>
  <div class="home-category"  @mouseleave="categoryId = null">
    <ul class="menu">
      <!-- 循环 li 做轮播图的展示 -->
      <li v-for="item in menuList" :key="item.id" :class="{ active: categoryId && categoryId === item.id }"
        @mouseenter="categoryId = item.id">
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
        <template v-for="sub in item.children" :key="sub.id">
          <router-link :to="`/category/sub/${sub.id}`">{{ sub.name }}</router-link>
        </template>
      </li>
    </ul>
    <!-- 左侧分类-弹层展示 -->
    <div class="layer">
      <h4 v-if="categoryId">{{ categoryId === 'brand' ? '品牌' : '分类' }}推荐 <small>根据您的购买或浏览记录推荐</small> </h4>
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 品牌的列表 -->
      <ul v-if="categoryId && categoryId === 'brand'">
        <li class="brand" v-for="item in brand.brands" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>


</template>

<script lang="ts" setup>
import { categoryStore } from "../../../store/modules/category"
import { reactive, computed, ref } from 'vue'
import { findBrand } from "../../../api/home"
const cStore = categoryStore();

// 1. 获取vuex的一级分类，并且只需要两个二级分类
// 2. 需要在组件内部，定义一个品牌数据
// 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
// 4. 进行渲染即可

const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-chilren', name: '品牌推荐' }],
  brands: []
})


// 处理品牌数据
findBrand(6).then(data => {
  brand.brands = data.result
})

// 用于在模板中循环的数组 
const menuList = computed(() => {
  // 获取一级分类， 并循环
  const arr = cStore.list.map(item => {
    // 返回一个对象， 模拟 Pinia 中定义品牌数据
    return {
      id: item.id,
      name: item.name,
      // 防止初始化没有children的时候调用slice函数报错
      children: item.children && item.children.slice(0, 2)
      // 只获取 item.children.slice(0, 2)  子类的 前两个
    }
  })
  // 将定义的 品牌推荐 追加到 数组最后
  arr.push(brand)
  return arr
})


// 获取当前分类逻辑   @mouseenter="categoryId=item.id"   @mouseenter 事件是 当鼠标滑过时触发事件
const categoryId = ref<string>('')
// 循环判断是否相等, 相等时返回 该项 的数据
const currCategory = computed(() => {
  return cStore.list.find(item => item.id === categoryId.value)
})
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.home-category {
  width: 250px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &:hover,
      &.active {
        background-color: @xtxColor;
      }

      a {
        color: #fff;
        margin-right: 4px;

        &:first-child {
          font-size: 16px;
        }
      }
    }


  }

  &:hover {

    // 划过时 将 .layer 的display 设置为可见
    .layer {
      display: block;
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 250px;
    // 先隐藏
    display: none;
    padding: 0 15px;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      // 弹性布局
      display: flex;
      flex-wrap: wrap;

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          // 3 的倍数 不设置 margin
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: @priceColor;

              i {
                font-size: 16px;
              }

            }
          }
        }
      }

      // 这里设置 品牌的样式
      li.brand {
        height: 180px;

        a {
          align-items: flex-start;

          img {
            width: 120px;
            height: 160px;

          }

          .info {
            p {
              margin-top: 8px;
            }

            .place {
              color: #999;
            }
          }
        }
      }
    }

  }
}
</style>
