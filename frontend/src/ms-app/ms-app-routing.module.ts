import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { AuthModalGuard } from "./guards/auth-modal-guard";
import { TrackListComponent } from "./track-list/track-list.component";
import { ArtistListComponent } from "./artist-list/artist-list.component";
import { AlbumListComponent } from "./album-list/album-list.component";
import { FavouriteListComponent } from "./favourite-list/favourite-list.component";
import { PlaylistListComponent } from "./playlist-list/playlist-list.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "/home/tracks" },
    { path: "home", component: MainComponent,
        children: [
            { path: "", pathMatch: "full", redirectTo: "tracks" },
            { path: "tracks", component: TrackListComponent },
            { path: "artists", component: ArtistListComponent },
            { path: "albums", component: AlbumListComponent },
            { path: "favourites", component: FavouriteListComponent },
            { path: "playlists", component: PlaylistListComponent },
        ]
    },
    { path: "signIn", component: SignInComponent, canActivate: [AuthModalGuard] },
    { path: "signUp", component: SignUpComponent, canActivate: [AuthModalGuard] },
    { path: "page-not-found", component: PageNotFoundComponent },
    { path: "**", redirectTo: "/page-not-found" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
