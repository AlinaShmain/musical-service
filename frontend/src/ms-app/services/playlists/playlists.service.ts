import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Playlist } from "src/ms-app/models/playlist";
import { Track } from "src/ms-app/models/track";
import { baseURL } from "../config.json";
import { UsersService } from "../users/users.service";

@Injectable({
  providedIn: "root"
})
export class PlaylistsService {

  constructor(private http: HttpClient, private usersService: UsersService) { }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${baseURL}/playlists`);
  }

  getUserPlaylists(token: string): Observable<Playlist[]> {
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.get<Playlist[]>(`${baseURL}/user-playlists`, httpOptions);
  }

  createPlaylist(playlistInfo: Playlist, token: string): Observable<{ playlistIds: string[] }> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.post<{ playlistIds: string[] }>(`${baseURL}/user-playlists/create`, JSON.stringify({ playlistInfo }), httpOptions)
    .pipe(
      tap(({ playlistIds }) => {
        this.usersService?.updatePlaylistIds(playlistIds);
      }),
    );
  }

  getPlaylistInfo(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${baseURL}/playlist/${id}`);
  }

  getPlaylistTracks(trackIds: string[]): Observable<Track[]> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<Track[]>(`${baseURL}/playlist/tracks`, JSON.stringify({ trackIds }), httpOptions);
  }

  editPlaylist(playlistInfo: Playlist, token: string): Observable<Playlist> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.post<Playlist>(`${baseURL}/user-playlists/edit`, JSON.stringify({ playlistInfo }), httpOptions);
  }

  deletePlaylist(playlistId: string, token: string): Observable<{ playlistId: string }> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.post<{ playlistId: string }>(`${baseURL}/user-playlists/delete`, JSON.stringify({ playlistId }), httpOptions);
  }

}
