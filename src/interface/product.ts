import { ICategoryChild } from "./category";

export interface IProduct{
    id?:number,
    product_name:string,
    price:string,
    size:string,
    category_id:number,
    image_src?:string[],
    video_src?:string,
    category?:ICategoryChild
}