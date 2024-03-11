import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Suino } from '../../models/suino';
import { MedidaPeso } from '../../models/medida-peso';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico-peso',
  templateUrl: './grafico-peso.component.html',
  styleUrl: './grafico-peso.component.css'
})
export class GraficoPesoComponent implements OnInit{

  @ViewChild("meuCanvas", { static: true}) elemento!: ElementRef;
  
  chart!: Chart;

  ngOnInit() {

  }

  formEdicao: FormGroup;
  suinos: Suino[] = [];
  selectedSuino: Suino | undefined;
  pesagens: MedidaPeso[] = [];
  selectedPesagem: MedidaPeso | undefined;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.formEdicao = this.formBuilder.group({
      brinco: ['', Validators.required],
      data: ['', Validators.required],
      peso: ['', Validators.required]
    });

    this.databaseService.getSuinos().subscribe((response) => {
       for (const key in response) {
         if (response.hasOwnProperty(key)) {
           this.suinos.push({ ...response[key], id: key });
         }
       }
    });
  }

  onBrincoSelectionChange(brinco: string) {
    this.selectedSuino = this.suinos.find(suino => suino.brincoAnimal === brinco);

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

      this.delay(2000).then(() => {
        // O código dentro deste bloco será executado após 2 segundos
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
            scales: {
              y: {
                beginAtZero: true
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

