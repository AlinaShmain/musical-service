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
import { GetValuesPipe } from "./pipes/get-values.pipe";
import { ToTimeFormatPipe } from "./pipes/to-time-format.pipe";
import { MaterialModule } from "./material/material.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { authReducer } from "./store/reducers/auth.reducer";
import { AuthEffects } from "./store/effects/auth.effects";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "@env/environment";
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
        MaterialModule,
        StoreModule.forRoot({
            auth: authReducer
        }),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    // entryComponents: [AuthModalComponent],
    providers: [UsersService],
    bootstrap: [MsAppComponent],
})
export class MsAppModule {
}
