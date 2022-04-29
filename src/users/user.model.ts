import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    // username: { type: String, required: true }, // See later
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    createdAt: { type: Date, required: false },
    modifiedAt: { type: Date, required: false },
});

export class User extends mongoose.Document {
    id: string;
    // username: string; // See later
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    slug: string;
    isActive: boolean;
    createdAt: Date;
    modifiedAt: Date;
}
