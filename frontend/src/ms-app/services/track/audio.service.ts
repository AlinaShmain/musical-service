import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AudioActions } from "src/ms-app/store/actions";
import { AppState } from "src/ms-app/store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class AudioService {

  private _audioContext: AudioContext;

  // constructor(private _audioContext: AudioContext) { }
  constructor(private store: Store<AppState>) {
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._audioContext = new AudioContext();
  }

  decodeAudioData(audioData: ArrayBuffer): Promise<AudioBuffer> {
    console.log("decoding audio data");

    return this._audioContext.decodeAudioData(audioData);
  }

  createBufferSource(audioBuffer: AudioBuffer): AudioBufferSourceNode {
    const bufferSource = this._audioContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(this._audioContext.destination);
    return bufferSource;
  }

  playTrack(bufferSource: AudioBufferSourceNode): string {
    console.log("playing track");

    const startedAt = (Date.now()).toString();
    console.log("start playing at", startedAt);
    bufferSource.start(0);
    // bufferSource.addEventListener("ended", (event) => {
    //   console.log("playback ended");
    // });
    return startedAt;
  }

  updateCurrentTime(startedAt: string, duration: number): void {
    const startNum = parseInt(startedAt, 10);

    const timer = setInterval(() => {
      console.log("updating time");
      const inSec = (Date.now() - startNum) / 1000;
      if (inSec >= duration) {
        console.log("playback ended");
        this.store.dispatch(AudioActions.endPlaying());
        clearInterval(timer);
        return;
      }
      this.store.dispatch(AudioActions.updateCurrentTime({ currentTime: (inSec).toString() }));
    }, 1000);
  }

}
