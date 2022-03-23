import * as mongoose from 'mongoose';
import { LandmarkType } from './../helpers/enums';

// Blueprint object for Mongoose (uses JS types), id autogenereated
export const LandmarkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    entranceFee: { type: Number, required: true },
    // type: { type: String, required: false },
    // coordinates: { type: String, required: false },
    // howToArrive: { type: String, required: false },
    // workingDays: { type: String, required: false },
    // workingHours: { type: String, required: false },
    // officialWebsite: { type: String, required: false },
});

// Entity Model (Database)
export class Landmark extends mongoose.Document {
    id: string;
    name: string;
    description: string;
    entranceFee: number; // needs to have Free|Unknown options too?
    // type?: LandmarkType; // Categorization?
    // coordinates?: string; // Entrance/Center, maybe polyline (via appia,...) and polygon (map overlay Domus aurea,...)
    // howToArrive?: string; // How to arrive: string (bus, metro, tram, ...)
    // workingDays?: string;
    // workingHours?: string; // hardcoded latest (in future users can propose update)
    // officialWebsite?: string; // link to an official website
    // Gallery: initially a single image
    // Attachments: Later (pdf/...)
    // Nearby metro stations: TBD later
}
