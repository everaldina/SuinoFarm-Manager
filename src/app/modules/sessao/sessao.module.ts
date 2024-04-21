import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CadastroAtividadeComponent } from './components/cadastro-atividade/cadastro-atividade.component';
import { CadastroSessaoComponent } from './components/cadastro-sessao/cadastro-sessao.component';
import { ListaSessoesComponent } from './components/lista-sessoes/lista-sessoes.component';
import { FinalizarSessaoComponent } from './components/finalizar-sessao/finalizar-sessao.component';


@NgModule({
  declarations: [
    CadastroAtividadeComponent,
    CadastroSessaoComponent,
    ListaSessoesComponent,
    FinalizarSessaoComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CadastroAtividadeComponent,
    CadastroSessaoComponent,
    ListaSessoesComponent,
    FinalizarSessaoComponent
  ]
})
export class SessaoModule { }
