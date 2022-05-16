import { defineStore } from 'pinia'


interface userInfo {
  id: string,
  avatar: string,
  nickname: string,
  account: string,
  mobile: string,
  token: string
}

export const userStore = defineStore('user', {
  state: () => {
    let profile: userInfo = {
      id: '',
      avatar: '',
      nickname: '',
      account: 'test',
      mobile: '123',
      token: ''
    }
    return {
      profile
    }
  },

  getters: {},

  actions: {
    // 修改用户信息，payload就是用户信息对象 ->  要修改就嘚修改全部
    setUser(payload: userInfo) {  // payload: userInfo 必须要符合类型
      this.profile = payload
    }

  },
  persist: {
    enabled: true,
    // 自定义 key
    // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
    strategies: [
      {
        key: 'profile', // 指定 key 值
        storage: localStorage,  // 指定存储到 localStorage
        // paths: this.profile,  // 需要进行缓存的数据   // 不写 paths 默认会缓存所有
      }
    ]
  }
})
