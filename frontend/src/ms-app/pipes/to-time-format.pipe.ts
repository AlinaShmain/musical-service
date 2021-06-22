import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toTimeFormat"
})
export class ToTimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    const secNum: number = Math.round(parseFloat(value));
    const min: number = Math.floor(secNum / 60);
    const sec: number = secNum % 60;
    const minStr: string = min < 10 ? "0" + min : `${min}`;
    const secStr: string = sec < 10 ? "0" + sec : `${sec}`;
    return `${minStr}:${secStr}`;
  }

}
