import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Card } from "../models/card";

@Component({
  selector: "ms-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {

  @Input() cards: Card[];
  @Input() widthCard: string = "150px";

}
