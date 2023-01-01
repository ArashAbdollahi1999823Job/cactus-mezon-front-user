export interface ICustomerBasketItemsDto {
  id: number
  isDelete?: boolean
  product: string
  type: string
  brand: string
  quantity: number
  price: number
  discount: number
  pictureThumbnailUrl: string
}
