// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// import { AuthModalComponent } from './auth-modal.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { SignInComponent } from './sign-in/sign-in.component';
// import { MaterialModule } from '../material/material.module';

// @NgModule({
//     imports: [
//         CommonModule,
//         MaterialModule,
//         RouterModule.forChild([
//             {
//                 path: "form", component: AuthModalComponent, children: [
//                     { path: "signIn", component: SignInComponent, data: { label: "Sign In" } },
//                     { path: "signUp", component: SignUpComponent, data: { label: "Sign Up" } },

//                 ]
//             },
//         ]),
//     ],
//     declarations: [SignInComponent, SignUpComponent, AuthModalComponent],
//     exports: [
//         AuthModalComponent,
//     ]
// })
// export class AuthModalModule { }
