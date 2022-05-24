<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // const props = defineProps({
    //   loading: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   finished: {
    //     type: Boolean,
    //     default: false,
    //   }
    // })
    const target = ref(null)
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件
          // 加载完成，finished 为 true，此时不会触发 load 事件
          // 无限加载组件可见，并满足一下条件，就触发父组件上的自定义 load 事件
          if (props.loading === false && props.finished === false) {
            emit('load')
          }
        }
      }
    )
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/styles/variables.less";

.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 50px;
      height: 50px;
      background: url(~@/assets/images/load.gif) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }

  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 200px;
      height: 134px;
      background: url(~@/assets/images/none.png) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
