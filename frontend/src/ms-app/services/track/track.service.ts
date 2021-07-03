import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { User } from "src/ms-app/models/user";
import { UsersService } from "../users/users.service";
import { AudioService } from "./audio.service";

@Injectable({
  providedIn: "root"
})
export class TrackService {

  constructor(private http: HttpClient, private audioService: AudioService, private usersService: UsersService) { }

  getTrack(id: string): Observable<{ audioBuffer: AudioBuffer, bufferSource: AudioBufferSourceNode }> {
    console.log("getting track from server", id);

    // const httpOptions = {
    //   observe: "response",
    //   responseType: "arraybuffer",
    // };

    return this.http.get(`http://localhost:3000/track/${id}`, { observe: "response", responseType: "arraybuffer" })
      .pipe(
        mergeMap(async (audioData: HttpResponse<ArrayBuffer>) => {
          console.log("got audio data", audioData.body);
          const audioBuffer = await this.audioService.decodeAudioData(audioData.body);
          console.log("decoded audio data", audioBuffer);
          const bufferSource = this.audioService.createBufferSource(audioBuffer);
          console.log("buffer source node", bufferSource);
          return { audioBuffer, bufferSource };
        }),
      );
  }

  addToFavourites(trackId: string, token: string): Observable<{ favouriteTracks: string[] }> {
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<{ favouriteTracks: string[] }>("http://localhost:3000/favourites/add", JSON.stringify({ trackId }), httpOptions)
    .pipe(
      tap(({ favouriteTracks }) => {
        console.log("favourites", favouriteTracks);

        const user: User = JSON.parse(this.usersService.getFromLocStore("user-info"));
        this.usersService.setToLocStore("user-info", JSON.stringify({ ...user, favouriteTracks }));
      }),
    );
  }

  deleteFromFavourites(trackId: string, token: string): Observable<{ favouriteTracks: string[] }> {
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<{ favouriteTracks: string[] }>("http://localhost:3000/favourites/delete", JSON.stringify({ trackId }), httpOptions)
      .pipe(
        tap(({ favouriteTracks }) => {
          console.log("favourites", favouriteTracks);

          const user: User = JSON.parse(this.usersService.getFromLocStore("user-info"));
          this.usersService.setToLocStore("user-info", JSON.stringify({ ...user, favouriteTracks }));
        }),
      );
  }

  addToPlaylist(trackId: string, playlistId: string, token: string): Observable<{ trackIds: string[] }> {
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<{ trackIds: string[] }>("http://localhost:3000/user-playlists/add", JSON.stringify({ trackId, playlistId }), httpOptions);
  }

}
