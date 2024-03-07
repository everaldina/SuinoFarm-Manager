import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormCadastroComponent } from './components/form-cadastro/form-cadastro.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';
import { GraficoPesoComponent } from './components/grafico-peso/grafico-peso.component';
import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { EdicaoPesoComponent } from './components/edicao-peso/edicao-peso.component';

const routes: Routes = [
  { path: 'cadastroPeso', component: CadastroPesoComponent },
  { path: 'edicaoPeso', component: EdicaoPesoComponent },
  { path: 'formCadastro', component: FormCadastroComponent },
  { path: 'graficoPeso', component: GraficoPesoComponent },
  { path: 'listaSuinos', component: ListaSuinosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormCadastroComponent,
    ListaSuinosComponent,
    GraficoPesoComponent,
    CadastroPesoComponent,
    EdicaoPesoComponent
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
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
