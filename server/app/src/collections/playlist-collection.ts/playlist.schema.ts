import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Playlist extends Document {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    trackIds: string[];

    @Prop()
    creatorId: string;

    @Prop()
    totalLikes: string;

    @Prop()
    imagesPath: string[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);