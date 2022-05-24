<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// 使用 emit 数据传输
const emit = defineEmits(["update:modelValue"])

const changeChecked = () => {
  // 点击后把取反后的布尔值传递给父组件
  const temp = !props.modelValue
  emit('update:modelValue', temp)
}

</script>

<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i class="iconfont " :class="modelValue ? 'icon-checked' : 'icon-unchecked'"></i>
    <span v-if="$slots.default" > <slot /> </span>
  </div>
</template>


<style scoped lang="less">
@import "@/assets/styles/variables.less";

.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  cursor: pointer;
  user-select: none;

  .icon-checked {
    color: @xtxColor;

    ~span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
