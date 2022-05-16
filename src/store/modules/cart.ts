import { defineStore } from "pinia";


export const cartStore = defineStore('cart', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cart', // 指定 key 值
        storage: localStorage,  // 指定存储到 localStorage
      }
    ]
    // 开启数据持久化
  },

  state: () => {
    return {
      // 具有数据的数组
      list: []
    }
  }
})
