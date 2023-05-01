import {ProductDto} from "../product/productDto";
import {TypePictureDto} from "../typePicture/typePictureDto";

export class TypeDto {
  id: string;
  slug:string;
  name:string;
  description:string;
  metaDescription:string;
  summary:string;
  isActive: true;
  parentTypeId:string;
  parentType:string;
  products:ProductDto[];
  typePictures:TypePictureDto[];
}
