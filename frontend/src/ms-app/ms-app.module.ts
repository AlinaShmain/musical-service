import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MsAppComponent } from "./ms-app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModalComponent } from "./auth-modal/auth-modal.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./ms-app-routing.module";
import { HomeComponent } from "./home/home.component";
import { UsersService } from "./services/users.service";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
    declarations: [
        MsAppComponent,
        AuthModalComponent,
        SignInComponent,
        SignUpComponent,
        PageNotFoundComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    // entryComponents: [AuthModalComponent],
    providers: [UsersService],
    // exports: [
    //     MaterialModule,
    // ],
    bootstrap: [MsAppComponent],
})
export class MsAppModule {
}
