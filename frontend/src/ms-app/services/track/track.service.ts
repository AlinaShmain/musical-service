import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TrackService {

  constructor(private http: HttpClient) { }

  addToFavourites(): void {
    // this.http()
  }
}