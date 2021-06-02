import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { AuthModalGuard } from "./guards/auth-modal-guard";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "/home" },
    { path: "home", component: HomeComponent },
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
