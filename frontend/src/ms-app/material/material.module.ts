import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";


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
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
  ]
})
export class MaterialModule { }
