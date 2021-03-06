import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { User } from "src/ms-app/models/user";
import { UsersService } from "../users/users.service";
import { AudioService } from "./audio.service";
import { baseURL } from "../config.json";

@Injectable({
  providedIn: "root"
})
export class TrackService {

  constructor(private http: HttpClient, private audioService: AudioService, private usersService: UsersService) { }

  getTrack(id: string): Observable<{ audioBuffer: AudioBuffer, bufferSource: AudioBufferSourceNode }> {

    return this.http.get(`${baseURL}/track/${id}`, { observe: "response", responseType: "arraybuffer" })
      .pipe(
        mergeMap(async (audioData: HttpResponse<ArrayBuffer>) => {
          const audioBuffer = await this.audioService.decodeAudioData(audioData.body);
          const bufferSource = this.audioService.createBufferSource(audioBuffer);
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

    return this.http.post<{ favouriteTracks: string[] }>(`${baseURL}/favourites/add`, JSON.stringify({ trackId }), httpOptions)
    .pipe(
      tap(({ favouriteTracks }) => {
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

    return this.http.post<{ favouriteTracks: string[] }>(`${baseURL}/favourites/delete`, JSON.stringify({ trackId }), httpOptions)
      .pipe(
        tap(({ favouriteTracks }) => {
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

    return this.http.post<{ trackIds: string[] }>(`${baseURL}/user-playlists/add`, JSON.stringify({ trackId, playlistId }), httpOptions);
  }

  deleteFromPlaylist(trackId: string, playlistId: string, token: string): Observable<{ trackIds: string[] }> {
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<{ trackIds: string[] }>(`${baseURL}/user-playlists/delete-track`, JSON.stringify({ trackId, playlistId }), httpOptions);
  }

}
