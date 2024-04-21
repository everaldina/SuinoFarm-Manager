import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthModule } from './modules/auth/auth.module';



import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';


import { PesoModule } from './modules/peso/peso.module';
import { SuinoModule } from './modules/suino/suino.module';
import { SessaoModule } from './modules/sessao/sessao.module';
import { SharedModule,  } from './modules/shared/shared.module';

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
    AuthComponent,
    LoadingSpinnerComponent,
    DialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    PesoModule,
    SuinoModule,
    SessaoModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
