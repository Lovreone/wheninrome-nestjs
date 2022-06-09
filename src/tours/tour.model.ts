import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type TourDocument = Tour & Document;

@Schema()
export class Tour {
    id?: string;

    // TODO: User writes "Tour name" - some sort of user friendly Tour identifier (Casual Friday Rome walk)
    @Prop({ type: String, required: true })
    name: string;

    // User selects date of the tour (datepicker, 1 day)
    @Prop({ type: Date, required: true })
    tourDate: Date; 
    
    // User sets his “Starting” location (ie Hotel, House, … coordinates)
    @Prop({ type: String, required: true })
    startingLocation: string; 
    
    /* TODO: Tour needs to have reference to parent User
        https://stackoverflow.com/questions/66395079/nestjs-and-mongoose-find-by-reference-object-id
    */  
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    userId: Types.ObjectId;

    @Prop({ type: String, required: false })
    tourNotes: string;

    /* TODO: Some sort of slug? If we want to make tours public with their 'pretty' unique urls
        @Prop({ type: String, required: true, unique: true }) 
        slug: string;
    */

    /* TODO: User selects a City (from available)
        cityId: ObjectId;
        cityId: string;

        city: City; 
        city: NestedCity; 
        - There is only one city per Tour
        - Upside: All required data will be fetched with one call
        - Downside: We will also have to update all tours on City Update like we already do with Landmarks
    */
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    cityId: Types.ObjectId;
    
    /* TODO: User picks N landmarks from selected city (from available)
        landmarkIds: Array<ObjectId>;
        landmarkIds: Array<string>;

        landmarks: Array<Landmark>;
        landmarks: Array<NestedLandmark>
    */

    /* TODO: Potentially add Some flags related to the tours
        isComplete: boolean; - If user needs some way to mark the Tour as finished
        isPublic: boolean; - If Tours can become public Users shoud be able to set Public/Private
        isActive: boolean; - If Admin needs to have some way to disable innapropriate content
    */
    
    @Prop({ type: Date, required: false })
    createdAt: Date;

    @Prop({ type: Date, required: false })
    modifiedAt: Date;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
