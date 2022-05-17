// ICategory 为请求 category 的返回值类型
export interface ICategory<T = string> {
  children: object[],  // object  Array
  name: T
  picture: T
  goods: object[], // object Array
  id: T
}


export interface IGoods<T = string> {
  id?: T
  name: T
  desc: T
  price: T
  picture: T
  discount?: T
  orderNum?: T
}
