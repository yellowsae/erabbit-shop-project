<template>
  <!-- 顶部导航栏 -->
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li><a class="clearFirstBorder" href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
        <li><a href="javascript:;">退出登录</a></li>
        <li><a href="javascript:;">请先登录</a></li>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
@import "../assets/styles/variables.less";

.app-topnav {
  background: #333;

  .container {
    ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 53px;

      li {
        a {
          padding: 0 15px;
          color: #cdcdcd;
          line-height: 1;
          display: inline-block;
          border-left: 2px solid #666;

          i {
            font-size: 14px;
            margin-right: 2px;
          }

          // @xtxColor 必须引入 主题的样式
          &:hover {
            color: @xtxColor;
          }

        }
        .clearFirstBorder {
          border-left: none;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }

}
</style>
