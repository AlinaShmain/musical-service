import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ms-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  // private destroy$ = new Subject<void>();
  // routeQueryParams$: Subscription;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
    // this.routeQueryParams$ = route.queryParams.subscribe((params) => {
    //   if (params["dialog"]) {
    //     console.log("param dialog true");
    //     this.openDialog();
    //   }
    // });
  }

  ngOnInit(): void {
    console.log("home component");
    console.log(this.route.snapshot.url[0]);
  }

  ngOnDestroy(): void {
    console.log("home on destroy");
    //   //   this.destroy$.next();
    //   //   this.destroy$.complete();
    // this.routeQueryParams$.unsubscribe();
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AuthModalComponent, {
  //     // width: "500px"
  //   });
  //   // console.log(this.route.url);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log("The dialog was closed", result);
  //     this.router.navigate(["."], { relativeTo: this.route });
  //   });
  // }

}
