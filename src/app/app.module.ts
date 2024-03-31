import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { CadastroSuinoComponent } from './components/cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';
import { GraficoPesoComponent } from './components/grafico-peso/grafico-peso.component';
import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { EdicaoPesoComponent } from './components/edicao-peso/edicao-peso.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AuthComponent } from './components/auth/auth.component';
import { CadastroAtividadeComponent } from './components/cadastro-atividade/cadastro-atividade.component';
import { CadastroSessaoComponent } from './components/cadastro-sessao/cadastro-sessao.component';
import { ListaSessoesComponent } from './components/lista-sessoes/lista-sessoes.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'cadastroSuino', component: CadastroSuinoComponent, canActivate: [AuthGuard] },
  { path: 'listaSuinos', component: ListaSuinosComponent, canActivate: [AuthGuard] },
  { path: 'cadastroPeso', component: CadastroPesoComponent, canActivate: [AuthGuard] },
  { path: 'edicaoPeso', component: EdicaoPesoComponent, canActivate: [AuthGuard] },
  { path: 'graficoPeso/:id', component: GraficoPesoComponent, canActivate: [AuthGuard] },
  { path: 'cadastroAtividade', component: CadastroAtividadeComponent, canActivate: [AuthGuard] },
  { path: 'cadastroSessao', component: CadastroSessaoComponent, canActivate: [AuthGuard] },
  { path: 'listaSessoes', component: ListaSessoesComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroSuinoComponent,
    ListaSuinosComponent,
    GraficoPesoComponent,
    CadastroPesoComponent,
    EdicaoPesoComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    DialogComponent,
    CadastroAtividadeComponent,
    CadastroSessaoComponent,
    ListaSessoesComponent,
    HomeComponent,
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
    MatIconModule,
    MatDialogModule,
    MatBadgeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
