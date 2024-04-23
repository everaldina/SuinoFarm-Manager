import { Component, Output } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { PesoModule } from '../../modules/peso/peso.module';

import { Suino } from '../../models/suino';
import { DatabaseService } from '../../services/database.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { forkJoin, map } from 'rxjs';

import { GraficoAtividadeComponent } from '../grafico-atividade/grafico-atividade.component';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    SharedModule,
    PesoModule,
    GraficoAtividadeComponent,
  ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css',
})
export class HistoricoComponent {
  suino = {} as Suino;
  id = '';
  mostarGraficoPeso: boolean = false;
  mostarGraficoAtividade: boolean = false;
  historico: {
    data: string;
    descricao: string;
    detalhes: string;
  }[] = [];

  constructor(
    private dataBase: DatabaseService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.dataBase.getSuino(this.id).subscribe((response) => {
      this.suino = response;
      this.suino.id = this.id;
    });

    this.dataBase.getHistoricoSuino(this.id).subscribe((response) => {
      this.historico = response;      
    });
  }

  formatarData(data: string): string {
    return this.datePipe.transform(data, 'dd/MM/yyyy') ?? '';
  }

  exibirGraficoPeso() {
    this.mostarGraficoPeso = !this.mostarGraficoPeso;
  }

  exibirGraficoAtividade() {
    this.mostarGraficoAtividade = !this.mostarGraficoAtividade;
  }
}
