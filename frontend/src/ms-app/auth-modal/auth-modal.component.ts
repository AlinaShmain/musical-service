import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ms-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log("init auth modal");
    console.log(this.route.snapshot.url[0]);
    this.router.navigate(["signIn"],  { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    console.warn("---- Dialog was destroyed ----");
  //   this.router.navigate([""]);
  }

  closeModal(): void {
    console.log("close modal");
  }

}
