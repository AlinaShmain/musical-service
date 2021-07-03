import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Card } from "../models/card";

@Component({
  selector: "ms-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {

  @Input() cards: Card[];
  @Input() widthCard: string = "150px";

  // constructor() { }

  ngOnInit(): void {
    console.log("init card component");
    console.log(this.cards);
  }

}
