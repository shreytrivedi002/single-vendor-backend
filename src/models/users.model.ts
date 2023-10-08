import { IsEmail, IsString } from "class-validator";
import { BaseModel } from "./base.model";
import {
    prop,
    Index,
} from '@typegoose/typegoose';


export enum Gender {
    male = 'male',
    female = 'female',
    lgbt = 'lgbt',
    na = 'na',
}

class Address {
    @prop({ required: false })
    fullAddress!: string;

    @prop({ required: false })
    zipCode!: string;

    @prop({ required: false })
    city!: string;

    @prop({ required: false })
    state!: string;

    @prop({ default: 'India' })
    country: string;
}

export class User extends BaseModel {
    @prop()
    name?: string;
    
    @IsString()
    @prop({ required: false })
    password?: string;

    @prop({ required: true })
    contact!: number;

    @prop({ enum: Gender, addNullToEnum: true, default: null })
    gender?: Gender;

    @prop({ required: false })
    address?: Address;

    @prop()
    photo?: string;

}