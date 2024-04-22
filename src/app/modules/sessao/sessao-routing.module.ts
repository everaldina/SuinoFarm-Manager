import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CadastroAtividadeComponent } from './components/cadastro-atividade/cadastro-atividade.component';
import { CadastroSessaoComponent } from './components/cadastro-sessao/cadastro-sessao.component';
import { ListaSessoesComponent } from './components/lista-sessoes/lista-sessoes.component';
import { FinalizarSessaoComponent } from './components/finalizar-sessao/finalizar-sessao.component';

const routes: Routes = [
    {
        path: 'sessoes',
        redirectTo: 'listar-sessoes',
        pathMatch: 'full'
    },
    {
        path: 'cadastro-sessao',
        component: CadastroSessaoComponent
    },
    {
        path: 'cadastro-atividade',
        component: CadastroAtividadeComponent
    },
    {
      path: 'listar-sessoes',
      component: ListaSessoesComponent,
    },
    {
      path: 'finalizar-sessao/:id',
      component: FinalizarSessaoComponent,
    }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SessaoRoutingModule { }
