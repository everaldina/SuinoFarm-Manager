import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CadastroSuinoComponent } from './components/cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './components/lista-suinos/lista-suinos.component';


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
