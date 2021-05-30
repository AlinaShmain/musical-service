import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "getKeys"
})
export class GetKeysPipe implements PipeTransform {

  transform(values: unknown): Array<keyof typeof values> {
    return Object.keys(values) as Array<keyof typeof values>;
  }

}
