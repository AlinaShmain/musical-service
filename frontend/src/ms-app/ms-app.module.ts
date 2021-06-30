import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// import { AudioContextModule } from "angular-audio-context";
import { MsAppComponent } from "./ms-app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModalComponent } from "./auth-modal/auth-modal.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // NoopAnimationsModule
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./ms-app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ValidationErrorsComponent } from "./auth-modal/validation-errors/validation-errors.component";
import { TrackListComponent } from "./track-list/track-list.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "@env/environment";
import { FavouriteListComponent } from "./favourite-list/favourite-list.component";
import { reducers } from "./store/reducers";
import { materialModules } from "./material";
import { effects } from "./store/effects";
import { HomeComponent } from "./home/home.component";
import { ModalService } from "./services/modal/modal.service";
import { PlayerComponent } from "./player/player.component";
import { MainComponent } from "./main/main.component";
import { GetKeysPipe } from "./pipes/get-keys.pipe";
import { ToTimeFormatPipe } from "./pipes/to-time-format.pipe";
import { GetValuesPipe } from "./pipes/get-values.pipe";
import { ModalEntryComponent } from "./modalEntry/modal-entry";
import { ArtistListComponent } from "./artist-list/artist-list.component";
import { PlaylistListComponent } from "./playlist-list/playlist-list.component";
import { AlbumListComponent } from "./album-list/album-list.component";
import { UsersService } from "./services/users/users.service";
import { FilterAuthPipe } from "./pipes/filter-auth.pipe";
import { TrackListService } from "./services/track-list/track-list.service";
import { ArtistListService } from "./services/artist-list/artist-list.service";
import { ArtistInfoComponent } from "./artist-info/artist-info.component";
@NgModule({
    declarations: [
        MsAppComponent,
        AuthModalComponent,
        ModalEntryComponent,
        SignInComponent,
        SignUpComponent,
        PageNotFoundComponent,
        MainComponent,
        ValidationErrorsComponent,
        TrackListComponent,
        GetKeysPipe,
        GetValuesPipe,
        ToTimeFormatPipe,
        ArtistListComponent,
        AlbumListComponent,
        FavouriteListComponent,
        PlaylistListComponent,
        PlayerComponent,
        HomeComponent,
        FilterAuthPipe,
        ArtistInfoComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        // NoopAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        materialModules,
        EffectsModule.forRoot([...effects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        // AudioContextModule.forRoot("balanced"),
        // WebAudioModule,
    ],
    entryComponents: [AuthModalComponent],
    providers: [UsersService, ModalService, TrackListService, ArtistListService],
    bootstrap: [MsAppComponent],
})
export class MsAppModule {
}
