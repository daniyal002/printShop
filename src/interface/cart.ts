import { IProduct } from "./product";

export interface ICart{
    id?:number,
    product:IProduct,
    count:number,
}