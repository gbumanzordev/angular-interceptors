import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingStatusInterceptor } from './main/interceptors/loading-status.interceptor';
import { CacheInterceptor } from './main/interceptors/cache.interceptor';
import { LoaderService } from './main/services/loader.service';
import { CacheService } from './main/services/cache.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorHandlerInterceptor } from './main/interceptors/error-handler.interceptor';
import { PayloadTransformInterceptor } from './main/interceptors/payload-transform.interceptor';
import { AuthorizationInterceptor } from './main/interceptors/authorization.interceptor';

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingStatusInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: PayloadTransformInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [...interceptors, LoaderService, CacheService],
  bootstrap: [AppComponent],
})
export class AppModule {}
