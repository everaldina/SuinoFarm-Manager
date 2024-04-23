import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { SharedModule } from '../../modules/shared/shared.module';
import { SessaoModule } from '../../modules/sessao/sessao.module';

import { DatabaseService } from '../../services/database.service';
import { Suino } from '../../models/suino';
import { Atividade } from '../../models/atividade';
import { Sessao } from '../../models/sessao';
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

  atividades: any[] = [];
  contagemAtividades: any = {};

  constructor(private databaseService: DatabaseService) {
    
  }

  ngOnInit() {
    if (this.selectedSuino) {
      
      this.databaseService.getHistoricoSuino(this.selectedSuino.id).subscribe((response) => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (response[key].descricao !== 'Pesagem') {
              this.atividades.push({ ...response[key], id: key });
              console.log(this.atividades);
            }
          }
        }

        this.atividades.forEach(atividade => {
          const id = atividade.id;
          this.contagemAtividades[id] = this.contagemAtividades[id] ? this.contagemAtividades[id] + 1 : 1;
        });
      });
      
      if (this.chart) {
        this.chart.destroy();
      }
      
      this.delay(1000).then(() => {
        Chart.register(...registerables);
        
        let atividadesOrdenadas = this.atividades;
        atividadesOrdenadas.sort((a, b) => {
          const dataA = new Date(a.data);
          const dataB = new Date(b.data);
          
          if (dataA < dataB) {
            return -1;
          }
          if (dataA > dataB) {
            return 1;
          }
          return 0;
        });
        
        const labelsSuino = atividadesOrdenadas.map(item => item.descricao);
        const dataSuino = atividadesOrdenadas.map(item => this.contagemAtividades[item.id]);

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
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
