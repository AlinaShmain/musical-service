import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Playlist } from "src/ms-app/models/playlist";
import { Track } from "src/ms-app/models/track";

@Injectable({
  providedIn: "root"
})
export class PlaylistsService {

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<Playlist[]> {

    console.log("get playlists from server");

    return this.http.get<Playlist[]>("http://localhost:3000/playlists");
  }

  getUserPlaylists(token: string): Observable<Playlist[]> {

    console.log("get playlist");

    const httpOptions = {
      headers: {
        // "CONTENT-TYPE": "application/json" as const,
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.get<Playlist[]>("http://localhost:3000/user-playlists", httpOptions);
  }

  createPlaylist(playlistInfo: Playlist, token: string): Observable<{ playlistIds: string[] }> {

    console.log("create playlist");

    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.post<{ playlistIds: string[] }>("http://localhost:3000/user-playlists/create", JSON.stringify({ playlistInfo }), httpOptions);
  }

  getPlaylistInfo(id: string): Observable<Playlist> {
    console.log("get playlist info from server", id);

    return this.http.get<Playlist>(`http://localhost:3000/playlist/${id}`);
  }

  getPlaylistTracks(trackIds: string[]): Observable<Track[]> {
    console.log("get playlist tracks from server", trackIds);

    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<Track[]>("http://localhost:3000/playlist/tracks", JSON.stringify({ trackIds }), httpOptions);
  }

  editPlaylist(playlistInfo: Playlist, token: string): Observable<Playlist> {

    console.log("edit playlist");

    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.post<Playlist>("http://localhost:3000/user-playlists/edit", JSON.stringify({ playlistInfo }), httpOptions);
  }

  deletePlaylist(playlistId: string, token: string): Observable<{ playlistId: string }> {

    console.log("delete playlist");

    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.post<{ playlistId: string }>("http://localhost:3000/user-playlists/delete", JSON.stringify({ playlistId }), httpOptions);
  }

}
