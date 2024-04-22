import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CadastroSuinoComponent } from './components/cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';

import { PesoModule } from '../peso/peso.module';
import { SuinoRoutingModule } from './suino-routing.module';

@NgModule({
  declarations: [
    CadastroSuinoComponent,
    ListaSuinosComponent
  ],
  imports: [
    SharedModule,
    PesoModule,
    SuinoRoutingModule
  ],
  exports: [
    CadastroSuinoComponent,
    ListaSuinosComponent,
  ]
})
export class SuinoModule { }
