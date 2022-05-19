import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/helpers/enums';

export type UserDocument = User & Document;

@Schema()
export class User {
    id?: string;

    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: Boolean, required: true })
    isActive: boolean;

    @Prop({ type: Date, required: false })
    createdAt?: Date;

    @Prop({ type: Date, required: false })
    modifiedAt?: Date;

    @Prop({ type: [String], required: true })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
