import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Track } from "src/ms-app/models/track";

@Injectable({
  providedIn: "root"
})
export class TrackListService {

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Track[]> {

    console.log("get tracks from server");

    return this.http.get<Track[]>("http://localhost:3000/tracks");
  }
}
