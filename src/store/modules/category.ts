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
        const { result } = await findAllCategory()
        // console.log(data)

        // 给一级分类加上一个控制二级分类显示隐藏的数据open

        result.forEach(item => { item.open = false })
        this.list = result // 虽然可以赋值， 但是  在 TS中  报错
        // 等待解决  请求得到的数据 中是否存在 result 属性
      } catch (e) {
        console.log("获取数据出错" + e)
      }

    },

    // 异步请求必须要加 async 和  await
    // getList() {
    //   const data = findAllCategory()
    //   console.log(data)
    // }

    // 添加了 show hide vuex的mutations函数修改 open src/store/modules/category.js

    // 修改当前一级分类下的open数据为true
    show(item: any) {
      const category = this.list.find(category => category.id === item.id)
      category.open = true
    },

    // 修改当前一级分类下的open数据为false
    hide(item: any) {
      const category = this.list.find(category => category.id === item.id)
      category.open = false
    }
  }
})
