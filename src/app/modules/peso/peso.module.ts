import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { GraficoPesoComponent } from './components/grafico-peso/grafico-peso.component';
import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { EdicaoPesoComponent } from './components/edicao-peso/edicao-peso.component';

import { PesoRoutingModule } from './peso-rounting.module';

@NgModule({
  declarations: [
    GraficoPesoComponent,
    CadastroPesoComponent,
    EdicaoPesoComponent
  ],
  imports: [
    SharedModule,
    PesoRoutingModule
  ],
  exports: [
    GraficoPesoComponent,
    CadastroPesoComponent,
    EdicaoPesoComponent
  ]
})
export class PesoModule { }
