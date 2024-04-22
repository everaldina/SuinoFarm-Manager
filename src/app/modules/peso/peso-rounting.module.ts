import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { GraficoPesoComponent } from './components/grafico-peso/grafico-peso.component';
import { EdicaoPesoComponent } from './components/edicao-peso/edicao-peso.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full'
    },
    {
        path: 'cadastro',
        component: CadastroPesoComponent
    },
    {
        path: 'editar',
        component: EdicaoPesoComponent
    },
    {
        path: 'grafico/:id',
        component: GraficoPesoComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PesoRoutingModule { }
