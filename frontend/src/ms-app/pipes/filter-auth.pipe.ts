import { Pipe, PipeTransform } from "@angular/core";
import { Link } from "../models/link";

@Pipe({
  name: "filterAuth"
})
export class FilterAuthPipe implements PipeTransform {

  transform(links: Link[], isAuthed: boolean): Link[] {
    if (isAuthed) {
      return links;
    }

    return links.filter((link) => !link.auth);
  }

}
