import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/login-response.model";
import { LoginInfo } from "../models/login-info.model";
import { LoginInfoGoogle } from "../models/login-info-google.model";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})

export class LoginService {

  url: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  signIn(credentials: LoginInfo): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.url}auth/login`,
      credentials,
      httpOptions
    );
  }

  signInWithGoogle(credentials: LoginInfoGoogle): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.url}auth/google`,
      credentials,
      httpOptions
    );
  }
  /*singUp(info: SingUpInfo): Observable<string> {
    return this.http.post<string>(
      `${this.url}auth/register`,
      info,
      httpOptions
    );
  }*/
}
