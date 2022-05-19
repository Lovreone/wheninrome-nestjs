import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LandmarkDocument = Landmark & Document;

@Schema()
export class NestedCity {
    @Prop({ type: String, required: false })
    id: string;

    @Prop({ type: String, required: false })
    name: string;

    @Prop({ type: String, required: false })
    slug: string;

    @Prop({ type: Boolean, required: false })
    isActive: boolean;
}

@Schema()
export class Landmark {
    id?: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, unique: true })
    slug: string;

    @Prop({ type: String, required: true })
    introText: string;

    @Prop({ type: String, required: false })
    description: string;

    @Prop({ type: Number, required: false })
    entranceFee: number;

    @Prop({ type: String, required: false })
    officialWebsite: string;

    @Prop({ type: String, required: false })
    featuredImage: string;

    @Prop({ type: String, required: false })
    howToArrive: string;

    @Prop({ type: String, required: false })
    workingDays: string;

    @Prop({ type: String, required: false })
    workingHours: string;
    
    @Prop({ type: String, required: false })
    coordinates: string;

    @Prop({ type: NestedCity, required: false, _id: false })
    city: NestedCity;

    @Prop({ type: Boolean, required: true })
    isActive: boolean;

    @Prop({ type: Date, required: false })
    createdAt: Date;

    @Prop({ type: Date, required: false })
    modifiedAt: Date;
}

export const LandmarkSchema = SchemaFactory.createForClass(Landmark);
