import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCadastroComponent } from './components/form-cadastro/form-cadastro.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';
import { GraficoPesoComponent } from './components/grafico-peso/grafico-peso.component';
import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { EdicaoPesoComponent } from './components/edicao-peso/edicao-peso.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
