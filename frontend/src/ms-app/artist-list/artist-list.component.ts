import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "ms-artist-list",
  templateUrl: "./artist-list.component.html",
  styleUrls: ["./artist-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log("artists component init");
  }

}
