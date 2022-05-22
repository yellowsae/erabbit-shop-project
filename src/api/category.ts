/**
 * 在API目录定义接口函数
  定义一个常量数据和后台保持一致（约定好9大分类），这样不请求后台就能展示一级分类，不至于白屏。
  在vuex中的category模块，基于常量数据定义state数据，定义修改分类列表函数，定义获取数据函数。
  在Layout组件获取调用actions获取数据，在头部导航组件渲染即可。
 */

// 定义首页需要的接口函数
import request from "../utils/request";


/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head')
}

/**
 * 一级类目-PC
 * @param {*} id 一级类目ID
 * @returns
 */
 export const findTopCategory = (id:any) => {
  return request('/category', 'get', { id: id })
}
