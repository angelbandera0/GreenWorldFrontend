import { ResponseGoogleLogin } from './../../../models/response-google-login.model';
import { Roles } from './../../../enums/roles.enum';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { LoginInfo } from 'src/app/models/login-info.model';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginInfoGoogle } from 'src/app/models/login-info-google.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  form: any = {};
  loading = false;
  isLoggedIn = false;
  isLoggedFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo!: LoginInfo;
  show = false;

  constructor(
    private authServiceSocial: SocialAuthService,
    private loginService: LoginService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authServiceSocial.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  onSubmit() {
    this.loading = true;
    this.loginInfo = new LoginInfo(this.form.email, this.form.password);
    console.log(this.loginInfo);

    this.loginService.signIn(this.loginInfo).subscribe(
      (res) => {
        console.log(res);
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUsername(res.user.name);
        this.tokenStorage.saveAuthorities(res.user.rol.rol);
        console.log(window.sessionStorage);
        if (Roles.USER_ROLE.toString() === res.user.rol.rol) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoggedFailed = true;
        this.loading = false;
      }
    );
  }

  signInWithGoogle(): void {
    this.authServiceSocial
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((respose: ResponseGoogleLogin) => {
        console.log(respose);
        let lig: LoginInfoGoogle = new LoginInfoGoogle(respose.idToken);
        this.loginService.signInWithGoogle(lig).subscribe(
          (res) => {
            console.log(res);
            this.tokenStorage.saveToken(res.token);
            this.tokenStorage.saveUsername(res.user.name);
            this.tokenStorage.saveAuthorities(res.user.rol.rol);
            console.log(window.sessionStorage);
            if (Roles.USER_ROLE.toString() === res.user.rol.rol) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
          (error) => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.isLoggedFailed = true;
            this.loading = false;
          }
        );
      });
  }

  signOut(): void {
    this.authServiceSocial.signOut();
  }

  refreshToken(): void {
    this.authServiceSocial.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
