import { Injectable } from '@nestjs/common';
import { Track } from '../model/track.dto';

@Injectable()
export class TracksService {

    private tracks: Track[] = [
        {
            id: "0",
            title: "Yesterday",
            artist: "The Beatles",
            album: "Help!",
            duration: 102,
            genre: "барокко-поп; чеймбер-поп"
        },
        {
            id: "1",
            title: "I Want to Break Free",
            artist: "Queen",
            album: "The Works",
            duration: 204,
            genre: "синтипоп; ‎поп-рок‎; ‎глэм-рок"
        },
        {
            id: "2",
            title: "Yesterday",
            artist: "The Beatles",
            album: "Help!",
            duration: 102,
            genre: "барокко-поп чеймбер-поп"
        },
        {
            id: "3",
            title: "Yesterday",
            artist: "The Beatles",
            album: "Help!",
            duration: 102,
            genre: "барокко-поп чеймбер-поп"
        },
        {
            id: "4",
            title: "Yesterday",
            artist: "The Beatles",
            album: "Help!",
            duration: 102,
            genre: "барокко-поп чеймбер-поп"
        },
        {
            id: "5",
            title: "Yesterday",
            artist: "The Beatles",
            album: "Help!",
            duration: 102,
            genre: "барокко-поп чеймбер-поп"
        }
    ];

    getAll(): Track[] {
        // console.log(this.tracks);
        return this.tracks;
    }

}
