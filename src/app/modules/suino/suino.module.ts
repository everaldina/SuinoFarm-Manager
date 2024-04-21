import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CadastroSuinoComponent } from './components/cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';

import { PesoModule } from '../peso/peso.module';

@NgModule({
  declarations: [
    CadastroSuinoComponent,
    ListaSuinosComponent
  ],
  imports: [
    SharedModule,
    PesoModule
  ],
  exports: [
    CadastroSuinoComponent,
    ListaSuinosComponent,
  ]
})
export class SuinoModule { }
