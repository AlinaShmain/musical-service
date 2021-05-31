import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { Token } from "src/ms-app/models/token";
import { User } from "src/ms-app/models/user";
import { SecurityService } from "../security/security.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  authenticated: boolean = false;
  private token: string = "";
  private user: User;

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<{ token: string }> {
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

    return this.http.post<{ token: string }>("http://localhost:3000/register", JSON.stringify(userData), httpOptions)
      .pipe(
        tap({
          next: (response) => {
            this.authenticated = true;
            console.log("response register", response);
            if (response.token) {
              this.token = response.token;
              console.log("recieved token", this.token);
              // localStorage.setItem('token', res['token']);
            }
            // this.user = user;
          },
          error: (error) => {
            console.log("response error", error);
          },
        }),
      );
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
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            console.log("http error response", err.status);
          }
          throw err;
          // return of(err);
        }),
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
          this.authenticated = true;
          this.token = token;
        }),
      );
  }

}
