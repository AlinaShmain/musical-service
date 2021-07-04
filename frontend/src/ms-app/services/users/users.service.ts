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
import { baseURL } from "../config.json";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  private authState: AuthState;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select(selectAuthState).subscribe((authState) => {
      this.authState = authState;
    });
  }

  registerUser(user: User): Observable<Token> {
    const httpOptions = {
      headers: {
        "CONTENT-TYPE": "application/json" as const,
      },
    };

    const securityUtil: SecurityService = new SecurityService(128, 1000);
    const keys: string = securityUtil.encrypt(user.password);

    const userData = {
      name: user.name,
      email: user.email,
      password: keys,
    };

    return this.http.post<Token>(`${baseURL}/register`, JSON.stringify(userData), httpOptions)
      .pipe(
        tap(({ token }) => {
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

    return this.http.get<{ encryptedPrivateKey: string, encryptedRND: string }>(`${baseURL}/login/${user.email}`)
      .pipe(
        switchMap(({ encryptedPrivateKey, encryptedRND }) => {
          const securityUtil: SecurityService = new SecurityService(128, 1000);

          const extractKey = /-----BEGIN ENCRYPTED PRIVATE KEY-----\r\n(.*)-----END ENCRYPTED PRIVATE KEY-----\r\n/.exec(encryptedPrivateKey);

          const privateKey = securityUtil.decryptPrivateKey(extractKey[1], user.password);

          const rnd: string = securityUtil.decryptRND(privateKey, encryptedRND);

          const hashRND = securityUtil.getHash(rnd);

          return this.http.post<{ token: string, userInfo: User }>(`${baseURL}/login`, JSON.stringify({ hashRND }), httpOptions)
            .pipe(
              catchError((err) => {
                return of(err);
              }),
            );
        }),
        tap(({ token, userInfo }) => {
          this.setToLocStore("jwt-token", token);
          this.setToLocStore("user-info", JSON.stringify(userInfo));
        }),
      );
  }

  getUserInfo(token: string): Observable<User> {
    const httpOptions = {
      headers: {
        "AUTHORIZATION": `Bearer ${token}`,
      },
    };
    return this.http.get<User>(`${baseURL}/user-info`, httpOptions)
    .pipe(
      tap((user) => {
        this.setToLocStore("user-info", JSON.stringify(user));
      }),
    );
  }

  setToLocStore(key: string, value: string): void {
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
      if (token) {
        const payload = window.atob(token.split(".")[1]);
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

    if (tokenInfo) {
      const tokenInfoObj: TokenInfo = JSON.parse(tokenInfo);
      return tokenInfoObj.exp > Math.round(Date.now() / 1000) ? true : false;
    }

    return false;
  }

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
    const user: User = JSON.parse(this.getFromLocStore("user-info"));
    return user?.favouriteTracks;
  }

  getPlaylistIds(): string[] {
    const user: User = JSON.parse(this.getFromLocStore("user-info"));
    return user?.playlistIds;
  }

}
