import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { Token } from "src/ms-app/models/token";
import { User } from "src/ms-app/models/user";
import { AppState, selectAuthState } from "src/ms-app/store/state/app.state";
import { AuthState } from "src/ms-app/store/state/auth.state";
import { SecurityService } from "../security/security.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  private authState: AuthState;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select(selectAuthState).subscribe((authState) => {
      console.log("update authenticated", authState.authenticated);
      this.authState = authState;
    });
  }

  registerUser(user: User): Observable<Token> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
      },
    };
    console.log("post", user);

    const securityUtil: SecurityService = new SecurityService(128, 1000);
    const keys: string = securityUtil.encrypt(user.password);

    const userData = {
      name: user.name,
      email: user.email,
      password: keys,
    };

    console.log("userData", userData);

    return this.http.post<Token>("http://localhost:3000/register", JSON.stringify(userData), httpOptions);
  }

  loginUser(user: User): Observable<Token> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
      },
    };
    console.log("get", user);

    return this.http.get<{ encryptedPrivateKey: string, encryptedRND: string }>(`http://localhost:3000/login/${user.email}`)
      .pipe(
        switchMap(({ encryptedPrivateKey, encryptedRND }) => {
          console.log("encryptedPrivateKey", encryptedPrivateKey);
          console.log("encryptedRND", encryptedRND);

          const securityUtil: SecurityService = new SecurityService(128, 1000);

          const extractKey = /-----BEGIN ENCRYPTED PRIVATE KEY-----\r\n(.*)-----END ENCRYPTED PRIVATE KEY-----\r\n/.exec(encryptedPrivateKey);

          const privateKey = securityUtil.decryptPrivateKey(extractKey[1], user.password);

          const rnd: string = securityUtil.decryptRND(privateKey, encryptedRND);
          console.log("rnd", rnd);

          const hashRND = securityUtil.getHash(rnd);

          return this.http.post<Token>("http://localhost:3000/login", JSON.stringify({ hashRND }), httpOptions)
            .pipe(
              catchError((err) => {
                console.log(err);
                return of(err);
              }),
            );
        }),
        tap(({ token }) => {
          console.log("token", token);
        }),
      );
  }

  isAuthenticated(): boolean {
    return this.authState.authenticated;
  }

  getUserEmail(): string {
    return this.authState.user.email;
  }

  getUserName(): string {
    return this.authState.user.name;
  }

}
