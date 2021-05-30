import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "getValues"
})
export class GetValuesPipe implements PipeTransform {

  transform(obj: unknown): Array<typeof obj[keyof typeof obj]> {
    type Keys = keyof typeof obj;
    return Object.values(obj) as Array<typeof obj[Keys]>;
  }

}
