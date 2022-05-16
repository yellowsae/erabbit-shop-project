import { defineStore } from "pinia";


export const categoryStore = defineStore('category', {
  state: () => {
    return {
      // 具有数据的数组
      list: []
    }
  }
})
