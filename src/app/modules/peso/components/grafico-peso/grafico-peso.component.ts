import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../../../services/database.service';
import { Suino } from '../../../../models/suino';
import { MedidaPeso } from '../../../../models/medida-peso';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico-peso',
  templateUrl: './grafico-peso.component.html',
  styleUrl: './grafico-peso.component.css'
})
export class GraficoPesoComponent implements OnInit{

  @ViewChild("meuCanvas", { static: true}) elemento!: ElementRef;
  
  chart!: Chart;

  id = '';
  @Input() selectedSuino: Suino | undefined;
  pesagens: MedidaPeso[] = [];

  constructor(private databaseService: DatabaseService) {
    
  }

  ngOnInit() {
    if (this.selectedSuino) {
      this.pesagens = [];
      this.databaseService.getPesos(this.selectedSuino.id).subscribe((response) => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            this.pesagens.push({ ...response[key], id: key });
          }
        }
      });

      
      if (this.chart) {
        this.chart.destroy();
      }
      
      this.delay(1000).then(() => {
        Chart.register(...registerables);
        
        let pesagensOrdenadas = this.pesagens;
        pesagensOrdenadas.sort((a, b) => {
          const dataA = new Date(a.data_medida);
          const dataB = new Date(b.data_medida);
          
          if (dataA < dataB) {
            return -1;
          }
          if (dataA > dataB) {
            return 1;
          }
          return 0;
        });
        
        const labelsSuino = pesagensOrdenadas.map(item => item.data_medida);
        const dataSuino = pesagensOrdenadas.map(item => item.peso);

        this.chart = new Chart(this.elemento.nativeElement, {
          type: 'line',
          data: {
            labels: labelsSuino,
            datasets: [
              {
                label: "Peso (Kg)",
                data: dataSuino
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Data da Medida'
                },
                ticks: {
                  maxRotation: 90,
                  minRotation: 90
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Peso (Kg)'
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Histórico de Peso'
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

  ordenarDatas(a: string, b: string) {
    const dataA = new Date(a);
    const dataB = new Date(b);

    if (dataA < dataB) {
      return -1;
    }
    if (dataA > dataB) {
      return 1;
    }
    return 0;
  };
}

