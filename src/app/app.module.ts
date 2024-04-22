import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Routes, RouterModule } from '@angular/router';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './modules/auth/components/auth/auth.component';

import { AuthInterceptor } from './modules/auth/auth.interceptor';
import { AuthGuard } from './modules/auth/auth.guard';

import { PesoModule } from './modules/peso/peso.module';
import { SuinoModule } from './modules/suino/suino.module';
import { SessaoModule } from './modules/sessao/sessao.module';
import { SharedModule  } from './modules/shared/shared.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { 
    path: 'suinos', 
    loadChildren: () => import('./modules/suino/suino.module').then(m => m.SuinoModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'pesos', 
    loadChildren: () => import('./modules/peso/peso.module').then(m => m.PesoModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'sessoes', 
    loadChildren: () => import('./modules/sessao/sessao.module').then(m => m.SessaoModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: '', 
    component: HomeComponent, canActivate: [AuthGuard] 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    DialogComponent,
    HomeComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PesoModule,
    SuinoModule,
    SessaoModule,
    SharedModule,
    PesoModule,
    SuinoModule,
    SessaoModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
