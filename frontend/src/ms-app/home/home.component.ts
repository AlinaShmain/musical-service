import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "ms-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("home component");
    console.log(this.route.snapshot.url[0]);
  }

  ngOnDestroy(): void {
    console.log("home on destroy");
  }

}
