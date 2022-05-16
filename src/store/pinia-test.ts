import { defineStore } from 'pinia'

export const piniaStore = defineStore('test', {
  state: () => {
    return {
      username: 'Yellowsea',
      age: 123,
      sex: '男'
    }
  },

  getters: {
    newName(state) {
      return state.username + '!!!!'
    }
  },

  actions: {
    // Pinia  去掉了mutations，所有的方法都封装在 actions 中

    updateName() {
      this.username = 'Hidie'
    },

    // 异步修改数据
    updateNameSync() {
      // 发请求
      setTimeout(() => {
        // 调用同级的updateName
        this.updateName()
      }, 1000)
    }
  },
  // 在引入数据持久化后
  // 开启数据缓存
  persist: {
    // 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。

    enabled: true,
    // 自定义 key
    // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
    strategies: [
      {
        key: 'my_user', // 指定 key 值
        storage: localStorage,  // 指定存储到 localStorage
        // paths: ['username', 'age'],  // 需要进行缓存的数据
      }
    ]
  }
})
