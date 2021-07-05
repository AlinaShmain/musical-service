import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Artist } from "src/ms-app/models/artist";
import { Track } from "src/ms-app/models/track";
import { baseURL } from "../config.json";

@Injectable({
  providedIn: "root"
})
export class ArtistListService {

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${baseURL}/artists`);
  }

  getArtistInfo(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${baseURL}/artist/${id}`);
  }

  getArtistTracks(trackIds: string[]): Observable<Track[]> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<Track[]>(`${baseURL}/artist/tracks`, JSON.stringify({ trackIds }), httpOptions);
  }

}
