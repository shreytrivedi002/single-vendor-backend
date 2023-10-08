export class CreateProductDto {
    title!: string
    description?: string;
    images?: [string];
    price?: number;
    location?: string;
    discount?: number;
    rating?: number;
    inventoryCount?: number;
}
