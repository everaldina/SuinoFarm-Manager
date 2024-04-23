import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { PesoModule } from '../../modules/peso/peso.module';

import { Suino } from '../../models/suino';
import { DatabaseService } from '../../services/database.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [SharedModule, PesoModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css',
})
export class HistoricoComponent {
  suino = {} as Suino;
  id = '';
  mostarGraficoPeso: boolean = false;
  mostarGraficoAtividade: boolean = false;
  historico: {
    data: Date;
    descricao: string;
    detalhes: string;
  }[] = [];

  constructor(
    private dataBase: DatabaseService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.dataBase.getSuino(this.id).subscribe((response) => {
      this.suino = response;
      this.suino.id = this.id;
    });

    this.dataBase.getHistoricoSuino(this.id).subscribe((response) => {
      this.historico = response;
      console.log(this.historico);
    });
  }

  exibirGraficoPeso() {
    this.mostarGraficoPeso = !this.mostarGraficoPeso;
  }

  exibirGraficoAtividade() {
    this.mostarGraficoAtividade = !this.mostarGraficoAtividade;
  }
}
