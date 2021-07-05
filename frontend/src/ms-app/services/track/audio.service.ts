import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AudioActions } from "src/ms-app/store/actions";
import { AppState, selectVolume } from "src/ms-app/store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class AudioService {

  private _audioContext: AudioContext;
  private gainNode: GainNode;
  private timer;

  constructor(private store: Store<AppState>) {
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._audioContext = new AudioContext();
    this.gainNode = this._audioContext.createGain();

    this.store.select(selectVolume).subscribe((volume) => {
      this.gainNode.gain.value = parseFloat(volume);
      this.gainNode.connect(this._audioContext.destination);
    });
  }

  decodeAudioData(audioData: ArrayBuffer): Promise<AudioBuffer> {
    return this._audioContext.decodeAudioData(audioData);
  }

  createBufferSource(audioBuffer: AudioBuffer): AudioBufferSourceNode {
    const bufferSource = this._audioContext.createBufferSource();
    bufferSource.buffer = audioBuffer;

    bufferSource.connect(this.gainNode);

    return bufferSource;
  }

  playTrack(bufferSource: AudioBufferSourceNode, resumeTime = 0): string {
    const startedAt = (Date.now()).toString();
    bufferSource.start(0, resumeTime);

    return startedAt;
  }

  updateCurrentTime(startedAt: number, duration: number): void {
    this.timer = setInterval(() => {
      ++startedAt;
      if (startedAt >= duration) {
        this.store.dispatch(AudioActions.endPlaying());
        clearInterval(this.timer);
        return;
      }
      this.store.dispatch(AudioActions.updateCurrentTime({ currentTime: (startedAt).toString() }));
    }, 1000);
  }

  pausePlaying(bufferSource: AudioBufferSourceNode): void {
    clearInterval(this.timer);
    bufferSource?.stop();
    this.store.dispatch(AudioActions.pausePlaying());
  }

  resetTrackData(): void {
    this.store.dispatch(AudioActions.resetTrackData());
  }

}
