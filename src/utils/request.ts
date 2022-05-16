// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from "axios"
import { userStore } from "../store/modules/user"
import router from "../router"


const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 5000,
})

// 请求拦截器
const uStore = userStore();
const profile = uStore.profile

instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地又token就在头部携带
  // 1. 获取用户信息对象

  //2. 判断是否具有token
  if (profile.token) {
    // 3. 设置token
    config.headers!.Authorization = `Bearer ${profile.token}`
  }
  // 如果没有 token
  return config
}, err => {
  return Promise.reject(err)
})


// 配置相应拦截器
instance.interceptors.response.use(
  // res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
  res => res.data,
  err => {
    // 401 状态码，进入该函数
    if (err.response && err.response.status === 401) {
      // 1. 清空无效用户信息
      // 2. 跳转到登录页
      // 3. 跳转需要传参（当前路由地址）给登录页码
      interface userInfo {
        id: string,
        avatar: string,
        nickname: string,
        account: string,
        mobile: string,
        token: string
      }
      const clearUserInfo: userInfo = {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
      // 清空路由信息
      uStore.setUser(clearUserInfo)

      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)


// 请求工具函数
export default (url: string, method: string, submitData: string) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
