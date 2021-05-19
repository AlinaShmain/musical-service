import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ms-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnDestroy {

  // navLinks: any[] = [];

  // isViewInitialized = false;

  constructor(
    // public dialogRef: MatDialogRef<AuthModalComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log("init auth modal");
    console.log(this.route.snapshot.url[0]);
    this.router.navigate(["signIn"],  { relativeTo: this.route });
    // this.navLinks = (
    //   (this.route.routeConfig && this.route.routeConfig.children) ?
    //     this.buildNavItems(this.route.routeConfig.children) :
    //     []
    // );
    // console.log('----nav links founded: ', this.navLinks);
  }

  // buildNavItems(routes: Routes): {
  //   path: string;
  //   label: any;
  // }[] {
  //   return (routes)
  //     .filter((route) => route.data)
  //     .map(({ path = "", data }) => ({
  //       path,
  //       label: data.label,
  //     }));
  // }

  ngOnDestroy(): void {
    console.warn("---- Dialog was destroyed ----");
  //   this.router.navigate([""]);
  }

  // ngAfterViewInit(): void {
  //   this.isViewInitialized = true;
  //   this.changeDetector.detectChanges();
  // }

  closeModal(): void {
    console.log("close modal");
    // this.dialogRef.close();
  }

  // isLinkActive(rla: RouterLinkActive): boolean {
  //   const routerLink = rla.linksWithHrefs.first;

  //   return this.router.isActive(routerLink.urlTree, false);
  // }

}
