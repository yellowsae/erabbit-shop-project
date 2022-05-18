<template>
  <div class="home-banner">
    <XtxCarousel :sliders="list"/>
  </div>
</template>

<script lang="ts" setup>
import XtxCarousel from '@/components/library/xtx-carousel.vue'
import { ref } from 'vue'
// import { findBanner } from '../../../api/home'
import { findBanner } from '@/api/home'

const list = ref([])

findBanner().then(data => {
  list.value = data.result
})

</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}

.xtx-carousel {

  //  /deep/   ::v-deep    :deep()   功能都是一样的
  :deep(.carousel-btn.prev) {
    left: 270px !important;
  }

  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
