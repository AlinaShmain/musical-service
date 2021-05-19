// import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
// import { MatDialog } from "@angular/material/dialog";
// import { ActivatedRoute, Router } from "@angular/router";
// import { AuthModalComponent } from "../auth-modal.component";

// @Component({
//   selector: "ms-modal-entry",
//   template: "",
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ModalEntryComponent implements OnInit {

//   constructor(public dialog: MatDialog, private router: Router,
//     private route: ActivatedRoute) {
//     console.log("modal entry");
//     this.openDialog();
//   }

//   ngOnInit(): void {
//     // this.router.navigate(["./signIn"], { relativeTo: this.route });
//     console.log(this.route.url);
//   }

//   openDialog(): void {
//     const dialogRef = this.dialog.open(AuthModalComponent, {
//       // width: '250px'
//     });
//     // this.router.navigate(["./signIn"], { relativeTo: this.route });
//     dialogRef.afterClosed().subscribe((result) => {
//       console.log("close dialog");
//       this.router.navigate(["../"], { relativeTo: this.route });
//     });
//   }

// }
