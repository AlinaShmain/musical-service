import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toTimeFormat"
})
export class ToTimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    // console.log(value);
    const secNum: number = parseInt(value, 10);
    const min: number = Math.floor(secNum / 60);
    const sec: number = secNum % 60;
    const minStr: string = min < 10 ? "0" + min : `${min}`;
    const secStr: string = sec < 10 ? "0" + sec : `${sec}`;
    return `${minStr}:${secStr}`;
  }

}
