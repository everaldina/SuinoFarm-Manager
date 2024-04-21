import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesoModule } from './peso.module';

import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { GraficoPesoComponent } from './components/grafico-peso/grafico-peso.component';
import { EdicaoPesoComponent } from './components/edicao-peso/edicao-peso.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cadastro',
    },
    {
        path: 'cadastro',
        component: CadastroPesoComponent
    },
    {
        path: 'edicao',
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
        RouterModule.forChild(routes),
        PesoModule
    ],
    exports: [RouterModule]
})
export class PesoRoutingModule { }
