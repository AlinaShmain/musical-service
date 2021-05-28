import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "ms-track-list",
  templateUrl: "./track-list.component.html",
  styleUrls: ["./track-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log("init track list component");
  }

}
