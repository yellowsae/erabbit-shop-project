// 获取请求
import request from "../utils/request"

// 到处 函数
export const findBrand = (limit: number) => {
  return request('/home/brand', 'get', { limit })
}
