<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form class="form" ref="formCom" :validate-schema="schema" v-slot="{ errors }">
      <template v-if="0">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field v-model="form.account" :class="{ error: errors.account }" name="account" type="text"
              placeholder="请输入用户名或手机号" />
          </div>
          <div v-if="errors.account" class="error"><i class="iconfont icon-warning" />{{ errors.account }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field v-model="form.password" :class="{ error: errors.password }" name="password" type="password"
              placeholder="请输入密码" />
          </div>
          <div v-if="errors.password" class="error">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 登录 --- 手机号 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field v-model="form.mobile" :class="{ error: errors.mobile }" name="mobile" type="text"
              placeholder="请输入手机号" />
          </div>
          <div v-if="errors.mobile" class="error">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field v-model="form.code" :class="{ error: errors.code }" name="code " type="text" placeholder="请输入验证码" />
            <span class="code">发送验证码</span>
          </div>
        </div>
        <div v-if="errors.code" class="error">
          <i class="iconfont icon-warning" />{{ errors.code }}
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import XtxCheckbox from "@/components/library/xtx-checkbox.vue"
import { ref, reactive, watch } from "vue"
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'


// 是否短信登录
const isMsgLogin = ref(false)
// 表单信息对象 - 用于后续表单校验的对象
const form = reactive({
  isAgree: true,
  account: null,
  password: null,
  mobile: null,
  code: null
})

// 切换表单元素，还原数据和清除校验效果
const formCom = ref(null)
watch(isMsgLogin, () => {
  // 还原数据
  form.isAgree = true
  form.account = null
  form.password = null
  form.mobile = null
  form.code = null
  // 补充校验效果清除，Form组件提供resetForm()
  formCom.value.resetForm()
})

</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
          border: none;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
