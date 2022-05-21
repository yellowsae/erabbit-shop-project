// 获取请求
import request from "../utils/request"

// 获取品牌的数据
export const findBrand = (limit: number) => {
  return request('/home/brand', 'get', { limit })
}


/**
 * 首页-广告区域(pc-小程序)
 * @param {*} distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @returns
 */
// 获取轮播图
export const findBanner = (distributionSite: number = 1) => {
  return request('/home/banner', 'get', { distributionSite: distributionSite })
}


/**
 * 首页-新鲜好物
 * @param {*} limit 默认值为 4，指定响应数据中商品的数量
 * @returns
 */

export const findNew = (limit: number = 4) => {
  return request('/home/new', 'get', { limit })
}


/**
 * 首页-人气推荐
 */

export const findHot = () => {
  return request('/home/hot', 'get')
}


/**
 * 首页-产品区块
 * @param {*} 无请求参数
 * @returns
 */
export const findGoods = () => {
  return request('/home/goods', 'get')
}
