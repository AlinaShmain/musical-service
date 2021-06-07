import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "ms-playlist-list",
  templateUrl: "./playlist-list.component.html",
  styleUrls: ["./playlist-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistListComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log("playlist component init");
  }

}
