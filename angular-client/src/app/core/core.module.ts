import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ApiService } from './services/api.service';
import { AuthenticateService } from './services/authenticate.service';
import { SessionService } from './services/session.service';
import { AuthGuard } from './guard/auth.guard';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    AuthenticateService,
    SessionService,
    AuthGuard,
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class CoreModule { }
