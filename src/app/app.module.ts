import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { authRoot } from './state/auth/indexAuth';
import { userRoot } from './state/user/indexUser';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { GlobalErrorHandlerService } from './interceptors/global-error-handler.service';
import { MenuEfects } from './state/menu/menu.effects';
import { menuReducer } from './state/menu/menu.reducer';
import { SimpleNotificationsModule } from 'angular2-notifications';
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.base_url,
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    PagesModule,
    SimpleNotificationsModule.forRoot(),
    AuthModule,
    StoreModule.forRoot({
      auth: authRoot.authReducer,
      user: userRoot.userReducer,
      menu: menuReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      authRoot.AuthEffects,
      userRoot.UserEffects,
      MenuEfects,
    ]),
    EntityDataModule.forRoot(entityConfig),
    MatSnackBarModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
