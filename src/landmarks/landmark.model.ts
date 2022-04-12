import * as mongoose from 'mongoose';

// Blueprint objects for Mongoose (uses JS types), id autogenereated
export const LandmarkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    entranceFee: { type: Number, required: true },
    city: { id: String, name: String, required: false }
});

// Entity Model (Database)
export class Landmark extends mongoose.Document {
    id: string;
    name: string;
    slug: string;
    description: string;
    entranceFee: number;
    city: NestedCity;
}

export interface NestedCity {
    id: string;
    name: string;
}