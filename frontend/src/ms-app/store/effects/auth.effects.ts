import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { User } from "src/ms-app/models/user";
import { TrackService } from "src/ms-app/services/track/track.service";
import { UsersService } from "src/ms-app/services/users/users.service";
import { AuthActions, AuthApiActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class AuthEffects {

    constructor(private actions$: Actions, private usersService: UsersService, private trackService: TrackService) { }

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.registerUser),
            mergeMap(({ user }) =>
                this.usersService.registerUser(user).pipe(
                    map(({ token }) =>
                        AuthApiActions.registeredSuccess({
                            token,
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
                    map(({ token, userInfo }) =>
                        AuthApiActions.loggedSuccess({
                            token, userInfo
                        }),
                    ),
                    catchError((error: Error) => of(AuthApiActions.loggedError({ loginError: error }))),
                )),
        ),
    );

    getUserInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.getUserInfo),
            mergeMap(({ token }) =>
                this.usersService.getUserInfo(token).pipe(
                    map((user: User) =>
                        AuthApiActions.gotUserSuccess({
                            user
                        }),
                    ),
                    // catchError((error: Error) => of(AuthApiActions.gotUserError({ verifyError: error }))),
                    catchError((error: Error) => {
                        this.usersService?.clearLocStore();
                        return of(AuthApiActions.registeredError({ registerError: error }));
                    }),
                ),
            ),
        ),
    );

    // verifyUser$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActions.verifyUser),
    //         mergeMap(({ user }) =>
    //             this.usersService.verifyUser(user).pipe(
    //                 map(({ token }) =>
    //                     AuthApiActions.verifiedSuccess({
    //                         token
    //                     }),
    //                 ),
    //                 catchError((error: Error) => of(AuthApiActions.verifiedError({ verifyError: error }))),
    //             )),
    //     ),
    // );

    likeTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.likeTrack),
            mergeMap(({ trackId, token }) =>
                this.trackService.addToFavourites(trackId, token).pipe(
                    map(({ favouriteTracks }) =>
                        AuthApiActions.addedToFavouritesSuccess({
                            favouriteTracks
                        }),
                    ),
                    catchError((error: Error) => of(AuthApiActions.addedToFavouritesError({ addedToFavouritesError: error }))),
                )),
        ),
    );

    dislikeTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.dislikeTrack),
            mergeMap(({ trackId, token }) =>
                this.trackService.deleteFromFavourites(trackId, token).pipe(
                    map(({ favouriteTracks }) =>
                        AuthApiActions.deletedFromFavouritesSuccess({
                            favouriteTracks
                        }),
                    ),
                    catchError((error: Error) => of(AuthApiActions.deletedFromFavouritesError({ deletedFromFavouritesError: error, trackId }))),
                )),
        ),
    );

}
