import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { CartItem } from "src/models/carts.model";
import { Product } from "src/models/products.model";

export class CreateCartDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartItem)
    products: CartItem[]
}
