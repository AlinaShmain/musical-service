import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  // imports: [
  //   MatDialogModule,
  //   MatTabsModule,
  //   MatButtonModule,
  //   MatIconModule,
  // ],
  exports: [
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
