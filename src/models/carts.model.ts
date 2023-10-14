import { IsArray, IsEmail, IsString } from "class-validator";
import { BaseModel } from "./base.model";
import {
    prop,
    Ref
} from '@typegoose/typegoose';
import { User } from "./users.model";
import { Product } from "./products.model";


export class CartItem {
    @prop({ required: true, ref: () => Product })
    productId!: Ref<Product>

    @prop({ required: true, default: 1 })
    quantity!: number;
}

export class Cart extends BaseModel {
    @prop({ required: true, ref: () => User })
    user!: Ref<User>;

    @prop({ required: true })
    products!: CartItem[];
}