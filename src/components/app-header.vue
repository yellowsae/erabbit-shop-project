<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">小兔鲜</router-link>
      </h1>
      <!-- Header 部分的 list  -->
      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <div class="cart">
        <a href="#" class="curr">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppHeaderNav from "./app-header-nav.vue"



</script>

<style lang="less" scoped>
@import "../assets/styles/variables.less";


.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;

    .logo {
      width: 200px;

      a {
        display: block;
        height: 132px;
        width: 100%;
        text-indent: -9999px;
        background: url(../assets/images/logo.png) no-repeat center 18px / contain;
      }

    }

    .search {
      width: 170px;
      height: 32px;
      position: relative;
      border-bottom: 1px solid #e7e7e7;
      line-height: 32px;

      .icon-search {
        // 搜索的 icon 图标
        font-size: 18px;
        margin-left: 5px;
      }

      input {
        width: 140px;
        padding-left: 5px;
        color: #666;
      }
    }

    .cart {
      width: 50px;

      .curr {
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;
        display: block;

        .icon-cart {
          font-size: 22px;
        }

        em {
          font-style: normal;
          position: absolute;
          right: 0;
          top: 0;
          padding: 1px 6px;
          line-height: 1;
          background: @helpColor;
          color: #fff;
          font-size: 12px;
          border-radius: 10px;
          font-family: Arial;
        }
      }
    }
  }
}
</style>
