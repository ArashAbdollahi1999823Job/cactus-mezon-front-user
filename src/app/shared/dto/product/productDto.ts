import {OffDto} from "../off/offDto";
import {ProductPictureDto} from "../productPicture/productPictureDto";


export class ProductDto {
  id: number
  name: string
  slug: string
  description: string
  metaDescription: string
  price: number
  summary: string
  score: number
  count: number
  isActive: boolean
  store: string
  type: string
  typeId:number
  brand: string
  inventory: string
  inventoryId:number
  off: OffDto
  offId:number
  pictures:ProductPictureDto[];
}
