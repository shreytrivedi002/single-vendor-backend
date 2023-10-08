import { InternalServerErrorException } from '@nestjs/common';
import { Ref, buildSchema, pre, prop } from '@typegoose/typegoose';
import {
    IsBoolean,
    IsDate,
    IsIn,
    IsMongoId,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { ObjectId, Schema } from 'mongoose';

/**
 * All model classes must extend this.
 */
@pre<BaseModel>('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
})
@pre<BaseModel>('updateOne', function () {
    // @ts-ignore
    this.updatedAt = new Date();
})
export class BaseModel {
    readonly _id!: ObjectId;

    @prop()
    createdAt: Date;

    @prop({ select: false })
    updatedAt: Date;

    protected static throwMongoError(err: any): void {
        throw new InternalServerErrorException(err, err.errmsg);
    }

    static get schema(): Schema {
        return buildSchema(this as any, {});
    }

    static get modelName(): string {
        return this.name;
    }
}

export class UrlObject {
    @IsUrl()
    @prop()
    url: string;

    @IsString()
    @prop({ required: false })
    title: string;

    @IsBoolean()
    @prop({ default: true })
    openInNewTab?: boolean;

    @IsString()
    @IsIn(['download', 'view'])
    @prop({ required: true, default: 'view' })
    type: 'download' | 'view';

    @IsDate()
    @IsOptional()
    @prop({ required: false })
    publishedOn: Date;

    @IsOptional()
    @IsString()
    @IsIn([
        'published',
        'pending',
        'deleted',
        'paused',
        'ongoing',
        'active',
        'draft',
    ])
    @prop({ required: false })
    status: string;

    //Add response type , what to expect from this url. could be pdf
}
