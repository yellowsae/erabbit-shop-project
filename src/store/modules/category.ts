import { defineStore } from "pinia"
// 引入常量参数
import { topCategory } from "../../api/constants"

// 引入请求函数
import { findAllCategory } from "../../api/category"

import { ICategory } from "../../utils/type"

// 将数据保存到 Pinia 
export const categoryStore = defineStore('category', {
  state: () => {
    return {
      // 具有数据的数组
      list: topCategory.map(item => ({ name: item }))
      // list: [{"引入的常量名字"}]
    }
  },

  actions: {
    async getList() {
      try {
        const data = await findAllCategory()
        // console.log(data)
        // 赋值
        this.list = data.result // 虽然可以赋值， 但是  在 TS中  报错
        // 等待解决  请求得到的数据 中是否存在 result 属性
      } catch (e) {
        console.log("获取数据出错" + e)
      }

    }

    // 异步请求必须要加 async 和  await
    // getList() {
    //   const data = findAllCategory()
    //   console.log(data)
    // }
  }
})
