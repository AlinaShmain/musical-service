import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UsersService } from "src/ms-app/services/users/users.service";
import { AuthActions, AuthApiActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class AuthEffects {

    constructor(private actions$: Actions, private usersService: UsersService) { }

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.registerUser),
            mergeMap(({ user }) =>
                this.usersService.registerUser(user).pipe(
                    map(({ token }) =>
                        AuthApiActions.registeredSuccess({
                            token
                        }),
                    ),
                    catchError((error: Error) => of(AuthApiActions.registeredError({ registerError: error }))),
                )),
        ),
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginUser),
            mergeMap(({ user }) =>
                this.usersService.loginUser(user).pipe(
                    map(({ token }) =>
                        AuthApiActions.loggedSuccess({
                            token
                        }),
                    ),
                    catchError((error: Error) => of(AuthApiActions.loggedError({ loginError: error }))),
                )),
        ),
    );

}
