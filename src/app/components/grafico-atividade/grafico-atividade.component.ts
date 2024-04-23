import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { SharedModule } from '../../modules/shared/shared.module';
import { SessaoModule } from '../../modules/sessao/sessao.module';

import { Suino } from '../../models/suino';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico-atividade',
  standalone: true,
  imports: [
    SharedModule,
    SessaoModule,

  ],
  templateUrl: './grafico-atividade.component.html',
  styleUrl: './grafico-atividade.component.css'
})

export class GraficoAtividadeComponent {
  @ViewChild("canvasAtividades", { static: true}) elemento!: ElementRef;
  
  chart!: Chart;

  id = '';
  @Input() selectedSuino: Suino | undefined;
  @Input() historico: any[] = [];

  atividades: any[] = [];
  contagemAtividades: any = {};

  constructor() { }

  ngOnInit() {    
    this.historico.forEach((atividade) => {
      if (atividade.descricao !== 'Pesagem') {
        this.atividades.push(atividade);
      }
    });

    this.atividades.forEach(atividade => {
      const id = atividade.id;
      this.contagemAtividades[id] = this.contagemAtividades[id] ? this.contagemAtividades[id] + 1 : 1;
    });
    
    if (this.chart) {
      this.chart.destroy();
    }
    
    this.delay(1000).then(() => {
      Chart.register(...registerables);
      
      // Remove duplicados
      this.atividades = this.atividades.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      );

      // Ordena em ordem alfabética de descrição
      this.atividades.sort((a, b) => a.descricao.localeCompare(b.descricao));

      const labelsSuino = this.atividades.map(item => item.descricao);
      const dataSuino = this.atividades.map(item => this.contagemAtividades[item.id]);

      this.chart = new Chart(this.elemento.nativeElement, {
        type: 'bar',
        data: {
          labels: labelsSuino,
          datasets: [
            {
              label: "Qtde de Aplicações",
              data: dataSuino
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 0.5
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Histórico de Atividades'
            }
          }
        }
      });
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
