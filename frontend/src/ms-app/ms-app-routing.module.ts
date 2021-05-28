import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignInComponent } from "./auth-modal/sign-in/sign-in.component";
import { SignUpComponent } from "./auth-modal/sign-up/sign-up.component";
import { AuthModalComponent } from "./auth-modal/auth-modal.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    {
        path: "home",
        // loadChildren: './home/home.module.ts#HomeModule',
        // loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
        // },
        component: HomeComponent,
        children: [
            {
                path: "form",
                component: AuthModalComponent,
                children: [
                    { path: "signIn", component: SignInComponent, data: { label: "Sign In" } },
                    { path: "signUp", component: SignUpComponent, data: { label: "Sign Up" } },
                ]
            },
        ]
    },
    { path: "page-not-found", component: PageNotFoundComponent },
    { path: "**", redirectTo: "/page-not-found" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
