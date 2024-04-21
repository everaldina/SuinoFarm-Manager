import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CadastroSuinoComponent } from './components/cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';


@NgModule({
  declarations: [
    CadastroSuinoComponent,
    ListaSuinosComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CadastroSuinoComponent,
    ListaSuinosComponent
  ]
})
export class SuinoModule { }
