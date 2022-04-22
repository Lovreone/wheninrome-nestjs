import * as mongoose from "mongoose";

export const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    country: { type: String, required: false },
    featuredImage: { type: String, required: false },
    introText: { type: String, required: false },
    localCurrency: { type: String, required: false },
    description: { type: String, required: false },
    isActive: { type: Boolean, required: true },
    createdAt: { type: Date, required: false },
    modifiedAt: { type: Date, required: false },
});

export class City extends mongoose.Document {
    id: string;
    name: string;
    slug: string;
    country: string;
    featuredImage: string;
    introText: string;
    localCurrency: string
    description: string;
    isActive: boolean;
    createdAt: Date;
    modifiedAt: Date;
}
