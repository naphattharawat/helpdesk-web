import { LoginService } from './../login.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  isRemember: any;
  error: any;
  showError = false;
  token: any;

  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    console.log(this.token);
    console.log(this.jwtHelper.isTokenExpired(this.token));

    if (!this.jwtHelper.isTokenExpired(this.token)) {
      this.router.navigateByUrl('/member');
    }
  }

  async login() {
    try {
      const rs: any = await this.loginService.login(this.username, this.password);
      if (rs.ok) {
        localStorage.setItem('token', rs.token);
        this.router.navigateByUrl('/member');
      } else {
        this.error = rs.error;
        this.showError = true;

      }

    } catch (error) {
      console.log(error);

    }
  }

}
