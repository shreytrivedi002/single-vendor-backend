import { IsArray, IsEmail, IsString } from "class-validator";
import { BaseModel } from "./base.model";
import {
    prop,
    Index,
} from '@typegoose/typegoose';


export class User extends BaseModel {
    @prop()
    title: string;

    @IsString()
    @prop({ required: false })
    description?: string;

    @prop({ required: false })
    @IsArray()
    images?: [];

    @prop({ required: false })
    price?: number;

    @prop({ required: false })
    location?: string;

    @prop({ required: false })
    discount?: number;

    @prop({ required: false })
    rating?: number;

    @prop({ required: false })
    inventoryCount?: number;
}