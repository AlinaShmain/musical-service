import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { HomeComponent } from "./home/home.component";
import { FavouriteListComponent } from "./favourite-list/favourite-list.component";
import { AuthGuard } from "./guards/auth.guard";
import { NegateAuthGuard } from "./guards/unauth.guard";
import { ArtistListComponent } from "./artist-list/artist-list.component";
import { ArtistInfoComponent } from "./artist-info/artist-info.component";
import { PlaylistListComponent } from "./playlist-list/playlist-list.component";
import { AuthModalEntryComponent } from "./modalEntry/auth-modal-entry";
import { AddToPlaylistModalEntryComponent } from "./modalEntry/add-to-playlist-modal-entry";
import { CreatePlaylistModalEntryComponent } from "./modalEntry/create-playlist-modal-entry";
import { UserPlaylistListComponent } from "./user-playlist-list/user-playlist-list.component";
import { PlaylistInfoComponent } from "./playlist-info/playlist-info.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "/main/home" },
    {
        path: "main", component: MainComponent,
        children: [
            { path: "", pathMatch: "full", redirectTo: "home" },
            { path: "form", component: AuthModalEntryComponent, canActivate: [NegateAuthGuard] },
            { path: "home", component: HomeComponent },
            { path: "artists", component: ArtistListComponent },
            { path: "artist/:id", component: ArtistInfoComponent },
            { path: "favourites", component: FavouriteListComponent, canActivate: [AuthGuard] },
            { path: "add-to-playlist/:id", component: AddToPlaylistModalEntryComponent, canActivate: [AuthGuard] },
            { path: "create-playlist", component: CreatePlaylistModalEntryComponent, canActivate: [AuthGuard] },
            { path: "playlists", component: PlaylistListComponent },
            { path: "user-playlists", component: UserPlaylistListComponent, canActivate: [AuthGuard] },
            { path: "playlist/:id", component: PlaylistInfoComponent },
        ]
    },
    { path: "signIn", outlet: "popupContent", component: SignInComponent },
    { path: "signUp", outlet: "popupContent", component: SignUpComponent },

    { path: "page-not-found", component: PageNotFoundComponent },
    { path: "**", redirectTo: "/page-not-found" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
