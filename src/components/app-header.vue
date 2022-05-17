<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">小兔鲜</router-link> 
      </h1>
      <ul class="navs">
        <li class="home">
          <router-link to="/">首页</router-link>
        </li>
        <li><a href="#">美食</a></li>
        <li><a href="#">餐厨</a></li>
        <li><a href="#">艺术</a></li>
        <li><a href="#">电器</a></li>
        <li><a href="#">居家</a></li>
        <li><a href="#">洗护</a></li>
        <li><a href="#">孕婴</a></li>
        <li><a href="#">服装</a></li>
        <li><a href="#">杂货</a></li>
      </ul>
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
    .navs {
      width: 820px;
      display: flex;
      justify-content: space-around;
      padding-left: 40px;
      li {
        margin-right: 40px;
        width: 38px;
        text-align: center;
        a {
          font-size: 16px;
          line-height: 32px;
          height: 32px;
          display: inline-block;
        }
        &:hover {
          a {
            color: @xtxColor;
            border-bottom: 1px solid @xtxColor;
          }
        }
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
