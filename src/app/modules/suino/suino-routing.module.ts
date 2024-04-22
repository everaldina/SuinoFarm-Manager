import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CadastroSuinoComponent } from './components/cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';
import { HistoricoComponent } from '../../components/historico/historico.component';


const routes: Routes = [
  {
    path: 'suinos',
    redirectTo: 'suinos/cadastro',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CadastroSuinoComponent
  },
  {
    path: 'listar',
    component: ListaSuinosComponent
  },
  {
    path: 'historico/:id',
    component: HistoricoComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SuinoRoutingModule { }
