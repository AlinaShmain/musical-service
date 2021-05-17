import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    artist: string;

    @Prop()
    album: string;

    @Prop({ required: true })
    duration: number;

    @Prop()
    genre: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);