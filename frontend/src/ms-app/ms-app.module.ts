import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MsAppComponent } from "./ms-app.component";
import { FormsModule } from "@angular/forms";
import { AuthModalComponent } from "./auth-modal/auth-modal.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./ms-app-routing.module";
import { HomeComponent } from "./home/home.component";
import { ModalEntryComponent } from "./auth-modal/modal-entry/modal-entry.component";
// import { HomeModule } from "./home/home.module";
@NgModule({
    declarations: [
        MsAppComponent,
        AuthModalComponent,
        SignInComponent,
        SignUpComponent,
        PageNotFoundComponent,
        HomeComponent,
        ModalEntryComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        // HomeModule,
    ],
    entryComponents: [AuthModalComponent],
    providers: [],
    // exports: [
    //     MaterialModule,
    // ],
    bootstrap: [MsAppComponent],
})
export class MsAppModule {
}
