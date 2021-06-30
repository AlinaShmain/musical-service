import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Artist } from "src/ms-app/models/artist";
import { Track } from "src/ms-app/models/track";

@Injectable({
  providedIn: "root"
})
export class ArtistListService {

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {

    console.log("get artists from server");

    return this.http.get<Artist[]>("http://localhost:3000/artists");
  }

  getArtistInfo(id: string): Observable<Artist> {
    console.log("get artist info from server", id);

    return this.http.get<Artist>(`http://localhost:3000/artist/${id}`);
  }

  getArtistTracks(trackIds: string[]): Observable<Track[]> {
    console.log("get artist tracks from server", trackIds);

    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    return this.http.post<Track[]>("http://localhost:3000/artist/tracks", JSON.stringify({ trackIds }), httpOptions);
  }

}
