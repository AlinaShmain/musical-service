import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "ms-favourite-list",
  templateUrl: "./favourite-list.component.html",
  styleUrls: ["./favourite-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteListComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log("favourites component init");
  }

}
