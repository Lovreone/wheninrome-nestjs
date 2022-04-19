import * as mongoose from 'mongoose';

// Blueprint objects for Mongoose (uses JS types), id autogenereated
export const LandmarkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    entranceFee: { type: Number, required: true },
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