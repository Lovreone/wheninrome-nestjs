import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
    id?: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, unique: true })
    slug: string;

    @Prop({ type: String, required: true })
    country: string;

    @Prop({ type: String, required: false })
    featuredImage: string;

    @Prop({ type: String, required: true })
    introText: string;

    @Prop({ type: String, required: false })
    localCurrency: string

    @Prop({ type: String, required: false })
    description: string;

    @Prop({ type: Boolean, required: true })
    isActive: boolean;

    @Prop({ type: Date, required: false })
    createdAt: Date;

    @Prop({ type: Date, required: false })
    modifiedAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
