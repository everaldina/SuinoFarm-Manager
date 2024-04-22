import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CadastroSuinoComponent } from './components/cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';
import { HistoricoComponent } from '../../components/historico/historico.component';

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
    SuinoRoutingModule,
    HistoricoComponent
  ],
  exports: [
    CadastroSuinoComponent,
    ListaSuinosComponent,
    HistoricoComponent
  ]
})
export class SuinoModule { }
