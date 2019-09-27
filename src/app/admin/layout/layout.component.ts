
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  nickname: any;
  @Inject('HOME_URL') private homeUrl: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.nickname = decoded.nickname;
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    // location.href = '/';
    this.router.navigateByUrl('/login');

  }
}
