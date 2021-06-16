import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { AppState, selectAudioBuffer } from "src/ms-app/store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class AudioService {

  private _audioContext: AudioContext;
  private audioBuffer: AudioBuffer;

  // constructor(private _audioContext: AudioContext) { }
  constructor(private store: Store<AppState>) {
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._audioContext = new AudioContext();
    this.store.select(selectAudioBuffer)
    .pipe(
      filter((value) => !!value),
    //   takeUntil(this.destroy$),
    )
    .subscribe((audioBuffer) => {
      console.log(audioBuffer);
      this.audioBuffer = audioBuffer;
    });

  }

  decodeAudioData(audioData: ArrayBuffer): Promise<AudioBuffer> {
    console.log("decoding audio data");

    return this._audioContext.decodeAudioData(audioData);
  }

  createBufferSource(audioBuffer: AudioBuffer): AudioBufferSourceNode {
    const bufferSource = this._audioContext.createBufferSource();
    // bufferSource.buffer = this.audioBuffer;
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(this._audioContext.destination);
    return bufferSource;
  }

  playTrack(bufferSource: AudioBufferSourceNode): void {
    console.log("playing track");

    bufferSource.start(0);
  }



}
