import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "ms-album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumListComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log("albums component init");
  }

}
