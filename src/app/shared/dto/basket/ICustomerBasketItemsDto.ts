export interface ICustomerBasketItemsDto {
  id: string
  isDelete?: boolean
  product: string
  type: string
  brand: string
  quantity: number
  price: number
  discount: number
  pictureThumbnailUrl: string
}
