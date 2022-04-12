import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CitySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    country: { type: String, required: false },
    image: { type: String, required: false },
    description: { type: String, required: false },
});

export class City extends mongoose.Document {
    id: string;
    name: string;
    slug: string;
    country: string;
    image: string;
    description: string;
}
