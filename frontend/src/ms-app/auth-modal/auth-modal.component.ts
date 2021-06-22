import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
@Component({
  selector: "ms-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnDestroy {

  // @ViewChild(RouterOutlet) outlet: RouterOutlet;

  ngOnInit(): void {
    console.log("init auth modal");
  }

  ngOnDestroy(): void {
    console.warn("---- Dialog was destroyed ----");

    // if (this.outlet.isActivated) {
    // console.log(this.outlet);
    // this.outlet.deactivate();
    //   console.log("deactivation");
    //   // console.log(this.outlet);
    // }
  }

}
