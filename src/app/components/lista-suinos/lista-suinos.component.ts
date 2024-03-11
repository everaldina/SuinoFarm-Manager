import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Suino } from '../../models/suino';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-suinos',
  templateUrl: './lista-suinos.component.html',
  styleUrl: './lista-suinos.component.css',
})
export class ListaSuinosComponent {
  listaSuinos: Suino[] = [];
  listaFiltrada: Suino[] = [];

  constructor(private dataBase: DatabaseService, private dataPipe: DatePipe) {
    this.dataBase.getSuinos().subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key) && typeof response[key] === 'object') {
          const suino = { ...response[key], id: key };
          if (suino.id !== 'pesos' ) {
            this.listaSuinos.push(suino);
          }
        }
      }
    });
    this.listaFiltrada = this.listaSuinos;
  }


  filtrarDataNascimento(data: Date){
    let data_pesquisa = this.dataPipe.transform(data, 'yyyy-MM-dd');
    return this.listaSuinos.filter(suino =>{
      suino.dataNascimento === data_pesquisa
    }
      );
  }

  filtrarDataSaida(data: Date){
    let data_pesquisa = this.dataPipe.transform(data, 'yyyy-MM-dd');
    return this.listaSuinos.filter(suino => suino.dataSaida === data_pesquisa);
  }

  filtrarPai(brinco_pai: string){
    return this.listaSuinos.filter(suino => suino.brincoPai === brinco_pai);
  }

  filtrarMae(brinco_mae: string){
    return this.listaSuinos.filter(suino => suino.brincoMae === brinco_mae);
  }

  filtrarSexo(sexo: string){
    return this.listaSuinos.filter(suino => suino.sexo === sexo);
  }

  filtrarStatus(status: string){
    return this.listaSuinos.filter(suino => suino.status === status);
  }


}
