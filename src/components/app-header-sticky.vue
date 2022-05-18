<template>
  <!-- 这个组件用来固定header 的
  当滚动条 滚动到某一个高度时， 足以将 Header 的导航遮住时， 将Header 给固定住 -->
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <div class="container" v-show="y>=78" >
      <router-link class="logo" to="/"></router-link>
      <!-- 使用Header-Nav 组件 -->
      <AppHeaderNav />
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppHeaderNav from './app-header-nav.vue';
// 引入 vueuser
import { useWindowScroll } from '@vueuse/core'
// 第二部： 写逻辑代码 设置 当滚动条遮盖住  header 头部时 动态设置 .show 的 class 属性
// 组件渲染后，监听滚动距离超过78px隐藏


const { y } = useWindowScroll();


/** 
// 浏览器绑定滚动事件
  // 第一种方式：  通过获取 DOM 节点判断

  import { ref } from 'vue'
  const isShow = ref(false);

  window.onscroll = () => {
    // 获取文档滚动出去了多少
    const scrollTop = document.documentElement.scrollTop;
    // 页面滚动到78px以上，显示吸顶组件，否则隐藏
    if (scrollTop >= 78) {
      isShow.value = true
    }else {
      isShow.value = false
    }
  }

  // 在模板中
  <div class="app-header-sticky" :class="{ show: isShow }">

*/

/**
 * 第二种方式 使用  vueuse/core  的工具函数 useWindowScroll
 * 
  import { useWindowScroll } from '@vueuse/core'
  const { y } = useWindowScroll();  // 获取滚动条的 y 轴

  // 在模板中使用： 
  <div class="app-header-sticky" :class="{ show: y >= 78 }">

 * 
 */


</script>

<style lang="less" scoped>
@import '../assets/styles/variables.less';

.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed; // 固定定位
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;

  // 在滚动到 78px 完成显示效果，需要滑出动画。
  // 第一步：默认移出顶部且完全透明，定义一个类回到默认吸顶位置完全显示。
  transform: translateY(-100%);
  opacity: 0;

  // 添加 class='show' 设置 展示的动画
  &.show {
    transition: all 0.3s linear;
    transform: translateY(0);
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;

    .logo {
      width: 200px;
      height: 80px;
      background: url(../assets/images/logo.png) no-repeat right 2px;
      background-size: 160px auto;
    }

    .right {
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid @xtxColor;

      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;

        &:hover {
          color: @xtxColor;
        }
      }
    }
  }


}
</style>
