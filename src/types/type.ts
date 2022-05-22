
export default interface goodsList<T = string> {
  desc?: T,
  discount?: T,
  id?: T,
  name?: T,
  orderNum?: number,
  picture?: T,
  price?: T,
  logo?: T,
  nameEn?: T,
  place?: T,
  type?: T,
  children?: Array<goodsList>,
  goods?: Array<goodsList>,
  saleInfo?: T,
  layer?: number,
}
