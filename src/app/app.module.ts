import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { LoginService } from './login.service';
import { LoginModule } from './login/login.module';
import { MemberModule } from './member/member.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AuthGuardService } from './auth-guard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    MemberModule,
    LoginModule,
    AuthModule,
    AdminModule
  ],
  providers: [
    AuthGuardService,
    LoginService,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
