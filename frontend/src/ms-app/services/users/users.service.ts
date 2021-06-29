import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { AuthInfo } from "src/ms-app/models/auth-info";
import { Token } from "src/ms-app/models/token";
import { TokenInfo } from "src/ms-app/models/token-info";
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

    return this.http.post<Token>("http://localhost:3000/register", JSON.stringify(userData), httpOptions)
      .pipe(
        tap(({ token }) => {
          console.log("token", token);
          this.setToLocStore("jwt-token", token);
        }),
      );
  }

  loginUser(user: User): Observable<AuthInfo> {
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

          return this.http.post<{ token: string, userInfo: User }>("http://localhost:3000/login", JSON.stringify({ hashRND }), httpOptions)
            .pipe(
              catchError((err) => {
                console.log(err);
                return of(err);
              }),
            );
        }),
        tap(({ token, userInfo }) => {
          console.log("token", token);
          console.log("user-info", userInfo);
          this.setToLocStore("jwt-token", token);
          this.setToLocStore("user-info", JSON.stringify(userInfo));
        }),
      );
  }

  getUserInfo(token: string): Observable<User> {
    // const token = this.getFromLocStore("jwt-token");
    console.log("get user info", token);
    // console.log(this.isValidToken());
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.get<User>("http://localhost:3000/user-info", httpOptions)
    .pipe(
      tap((user) => {
        console.log("user", user);
        this.setToLocStore("user-info", JSON.stringify(user));
      }),
    );
  }

  setToLocStore(key: string, value: string): void {
    console.log(key);
    console.log(value);
    localStorage.setItem(key, value);
  }

  removeFromLocStore(key: string): void {
    localStorage.removeItem(key);
  }

  getFromLocStore(key: string): string {
    return localStorage.getItem(key);
  }

  clearLocStore(): void {
    localStorage?.clear();
  }

  getTokenInfo(): string {
    try {
      const token: string = this.getFromLocStore("jwt-token");
      // console.log("get token", token);
      if (token) {
        const payload = window.atob(token.split(".")[1]);
        console.log("payload", payload);
        // return JSON.parse(payload);
        return payload;
      }
      return null;
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const tokenInfo: string = this.getTokenInfo();
    // console.log("token info", tokenInfo);

    if (tokenInfo) {
      const tokenInfoObj: TokenInfo = JSON.parse(tokenInfo);
      console.log(Math.round(Date.now() / 1000));
      return tokenInfoObj.exp > Math.round(Date.now() / 1000) ? true : false;
    }

    return false;
  }

  // verifyToken(): Observable<Token> {
  //   return this.http.get<Token>(`http://localhost:3000/verify/${user.email}`);
  // }

  // isAuthenticated(): boolean {
    // const isAuthenticated: User = JSON.parse(this.getFromLocStore("authenticated"));
    // return this.authState.authenticated && this.isValidToken();
  // }

  getUserEmail(): string {
    return this.authState.user.email;
    // const user: User = JSON.parse(this.getFromLocStore("user-info"));
    // return user?.email;
  }

  getUserName(): string {
    return this.authState.user.name;
    // const user: User = JSON.parse(this.getFromLocStore("user-info"));
    // return user?.name;
  }

  getFavourites(): string[] {
    return this.authState.user?.favouriteTracks;
    // const user: User = JSON.parse(this.getFromLocStore("user-info"));
    // return user?.favouriteTracks;
  }

}
