export interface ICategory {
    id?: number;
    category_name: string;
    parent_id?:number
    image_url?: string; // для хранения URL изображения
}
