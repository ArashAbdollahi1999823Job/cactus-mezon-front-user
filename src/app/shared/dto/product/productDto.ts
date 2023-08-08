import {OffDto} from "../off/offDto";
import {ProductPictureDto} from "../productPicture/productPictureDto";
import {ColorDto} from "../color/colorDto";
import {ProductItemDto} from "../productItem/productItemDto";


export class ProductDto {
  sellerPhoneNumber:string
  id: string
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
  typeId:string
  typeSlug:String
  brand: string
  inventory: string
  inventoryId:string
  off: OffDto
  offId:string
  productPictures:ProductPictureDto[];
  colorDtos:ColorDto[];
  productItemDtos:ProductItemDto[];
  storeSlug:string;
}
