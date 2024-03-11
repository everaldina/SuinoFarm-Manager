import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormCadastroComponent } from './components/form-cadastro/form-cadastro.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';
import { GraficoPesoComponent } from './components/grafico-peso/grafico-peso.component';
import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { EdicaoPesoComponent } from './components/edicao-peso/edicao-peso.component';
import { AuthComponent } from './components/auth/auth.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

const routes: Routes = [
  { path: 'cadastroPeso', component: CadastroPesoComponent, canActivate: [AuthGuard] },
  { path: 'edicaoPeso', component: EdicaoPesoComponent, canActivate: [AuthGuard] },
  { path: 'formCadastro', component: FormCadastroComponent, canActivate: [AuthGuard] },
  { path: 'graficoPeso', component: GraficoPesoComponent, canActivate: [AuthGuard] },
  { path: 'listaSuinos', component: ListaSuinosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormCadastroComponent,
    ListaSuinosComponent,
    GraficoPesoComponent,
    CadastroPesoComponent,
    EdicaoPesoComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
