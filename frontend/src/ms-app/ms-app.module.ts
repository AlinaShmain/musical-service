import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MsAppComponent } from "./ms-app.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        MsAppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [MsAppComponent],
})
export class MsAppModule {
}
