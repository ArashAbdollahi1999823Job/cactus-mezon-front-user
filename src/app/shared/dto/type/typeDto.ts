import {ProductDto} from "../product/productDto";
import {TypePictureDto} from "../typePicture/typePictureDto";

export class TypeDto {
  id: number;
  slug:string;
  name:string;
  description:string;
  metaDescription:string;
  summary:string;
  isActive: true;
  parentTypeId:number;
  parentType:string;
  products:ProductDto[];
  typePictures:TypePictureDto[];
}
