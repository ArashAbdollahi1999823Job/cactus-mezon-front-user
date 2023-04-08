import {ProductDto} from "../product/productDto";

export class TypeDto {
  id: number;
  name:string;
  description:string;
  metaDescription:string;
  summary:string;
  isActive: true;
  parentTypeId:number;
  parentType:string;

  products:ProductDto[];
}
