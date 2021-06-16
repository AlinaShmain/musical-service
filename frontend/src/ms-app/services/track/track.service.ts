import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AudioService } from "./audio.service";

@Injectable({
  providedIn: "root"
})
export class TrackService {

  constructor(private http: HttpClient, private audioService: AudioService) { }

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

  addToFavourites(): void {
    // this.http()
  }
}
