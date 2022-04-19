import * as mongoose from 'mongoose';

// Blueprint objects for Mongoose (uses JS types), id autogenereated
export const LandmarkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    entranceFee: { type: Number, required: true },
    officialWebsite: { type: String, required: false },
    featuredImage: { type: String, required: false },
    howToArrive: { type: String, required: false },
    workingDays: { type: String, required: false },
    workingHours: { type: String, required: false },
    coordinates: { type: String, required: false },
    city: { 
        id: String, 
        name: String, 
        isActive: Boolean, 
        required: false 
    },
    isActive: { type: Boolean, required: true },
    createdAt: { type: Date, required: false },
    modifiedAt: { type: Date, required: false },
});

// Entity Model (Database)
export class Landmark extends mongoose.Document {
    id: string;
    name: string;
    slug: string;
    description: string;
    entranceFee: number;
    officialWebsite: string;
    featuredImage: string;
    howToArrive: string;
    workingDays: string;
    workingHours: string;
    coordinates: string;
    city: NestedCity;
    isActive: boolean;
    createdAt: Date;
    modifiedAt: Date;
}

export interface NestedCity {
    id: string;
    name: string;
    isActive: boolean;
}