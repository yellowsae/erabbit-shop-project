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
export const findTopCategory = (id: any) => {
  return request('/category', 'get', { id: id })
}



/**
 *二级类目-筛选条件-PC
 * @param { Number } id 二级分类ID
 * @returns Promise
 */
export const findSubFilter = (id: any) => {
  return request('/category/sub/filter', 'get', { id: id })
}


/**
 * 商品列表--分页查询
 * @param {  }
 * @returns Promise
 */
export const findCategoryGoods = (data: any) => {
  return request('/category/goods', 'POST', data)
}


/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */
export const findSubCategoryGoods = (params: any) => {
  return request('/category/goods/temporary', 'post', params)
}
