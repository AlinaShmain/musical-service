import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Artist extends Document {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    path: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    genre: string;

    @Prop()
    description: string;

    @Prop()
    trackIds: string[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);