import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/helpers/enums';

export type UserDocument = User & Document;

@Schema()
export class User {
    id?: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    isActive: boolean;

    @Prop({ required: false })
    createdAt?: Date;

    @Prop({ required: false })
    modifiedAt?: Date;

    @Prop({ type: [String], required: true })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

/* Useful docs:
    https://docs.nestjs.com/techniques/mongodb
    @Schema() config docs 
        https://mongoosejs.com/docs/guide.html#options
    @Prop() config docs 
        https://mongoosejs.com/docs/schematypes.html
        https://mongoosejs.com/docs/schematypes.html#schematype-options
*/
