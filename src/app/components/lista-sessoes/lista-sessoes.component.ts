import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Sessao } from '../../models/sessao';
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-lista-sessoes',
  templateUrl: './lista-sessoes.component.html',
  styleUrl: './lista-sessoes.component.css'
})
export class ListaSessoesComponent {
  listaSessoes: Sessao[] = [];
  listaFiltrada: Sessao[] = [];
  valorFiltro: string = '';
  valorPesquisa: any = '';

  constructor(private dataBase: DatabaseService, private dataPipe: DatePipe, private router: Router, private dialog: MatDialog) {
    this.dataBase.getSessoes().subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key) && typeof response[key] === 'object') {
          const sessao = { ...response[key], id: key };
          this.listaSessoes.push(sessao);
        }
      }
    });
    this.listaFiltrada = this.listaSessoes;
  }

  filtrarData(data: Date){
    let data_pesquisa = this.dataPipe.transform(data, 'yyyy-MM-dd');
    return this.listaSessoes.filter(sessao => this.dataPipe.transform(sessao.data, 'yyyy-MM-dd') === data_pesquisa);
  }

  filtrarStatus(status: boolean){
    return this.listaSessoes.filter(sessao => sessao.status === status);
  }

  filtrarListagem(filtro: string){
    switch (filtro){
      case 'data':
        this.listaFiltrada = this.filtrarData(this.valorPesquisa);
        break;

      case 'status':
        this.listaFiltrada = this.filtrarStatus(this.valorPesquisa);
        break;
    }
  }

  verificarAtraso(data: Date){
    let data_sessao = new Date(data);
    let data_atual = new Date();

    return data_sessao < data_atual;
  }

  limparFiltro(){
    this.listaFiltrada = this.listaSessoes;
    this.valorPesquisa = '';
  }
}
