import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Track } from "src/ms-app/models/track";
import { baseURL } from "../config.json";

@Injectable({
  providedIn: "root"
})
export class TrackListService {

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${baseURL}/tracks`);
  }

  getFavourites(token: string): Observable<Track[]> {
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.get<Track[]>(`${baseURL}/favourites`, httpOptions);
  }

}
