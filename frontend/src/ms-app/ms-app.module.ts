import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MsAppComponent } from "./ms-app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModalComponent } from "./auth-modal/auth-modal.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./ms-app-routing.module";
import { HomeComponent } from "./home/home.component";
import { UsersService } from "./services/users/users.service";
import { HttpClientModule } from "@angular/common/http";
import { ValidationErrorsComponent } from "./auth-modal/validation-errors/validation-errors.component";
import { TrackListComponent } from "./track-list/track-list.component";
import { GetKeysPipe } from "./pipes/get-keys.pipe";
import { FilterPropPipe } from "./pipes/filter-prop.pipe";
import { GetValuesPipe } from "./pipes/get-values.pipe";
import { ToTimeFormatPipe } from "./pipes/to-time-format.pipe";
@NgModule({
    declarations: [
        MsAppComponent,
        AuthModalComponent,
        SignInComponent,
        SignUpComponent,
        PageNotFoundComponent,
        HomeComponent,
        ValidationErrorsComponent,
        TrackListComponent,
        GetKeysPipe,
        FilterPropPipe,
        GetValuesPipe,
        ToTimeFormatPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    // entryComponents: [AuthModalComponent],
    providers: [UsersService],
    bootstrap: [MsAppComponent],
})
export class MsAppModule {
}
