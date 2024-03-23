import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Suino } from '../../models/suino';
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-lista-suinos',
  templateUrl: './lista-suinos.component.html',
  styleUrl: './lista-suinos.component.css',
})

export class ListaSuinosComponent {
  listaSuinos: Suino[] = [];
  listaFiltrada: Suino[] = [];
  animalExpandidoIndex: number | null | undefined;
  valorFiltro: string = '';
  valorPesquisa: any = '';
  suinoParaGrafico: Suino = {} as Suino;

  constructor(private dataBase: DatabaseService, private dataPipe: DatePipe, private router: Router, private dialog: MatDialog) {
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
    return this.listaSuinos.filter(suino => suino.dataNascimento === data_pesquisa);
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

  expandirAnimal(index: number) {
    this.animalExpandidoIndex = index === this.animalExpandidoIndex ? null : index;
  }

  alterarStatus(suino: Suino, status: "Ativo" | "Vendido" | "Morto") {
    suino.status = status;
    this.dataBase.updateSuino(suino.id, suino);
  }

  excluirAnimal(id: string) {
    this.dataBase.deleteSuino(id);

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  filtrarListagem(filtro: string){
    switch (filtro){
      case 'brincoPai':
        this.listaFiltrada = this.filtrarPai(this.valorPesquisa.toString());
        break;

      case 'brincoMae':
        this.listaFiltrada = this.filtrarMae(this.valorPesquisa.toString());
        break;

      case 'dataNascimento':
        this.listaFiltrada = this.filtrarDataNascimento(this.valorPesquisa);
        break;

      case 'dataSaida':
        this.listaFiltrada = this.filtrarDataSaida(this.valorPesquisa);
        break;

      case 'sexo':
        this.listaFiltrada = this.filtrarSexo(this.valorPesquisa);
        break;

      case 'status':
        this.listaFiltrada = this.filtrarStatus(this.valorPesquisa);
        break;
    }
  }

  limparFiltro(){
    this.listaFiltrada = this.listaSuinos;
    this.valorPesquisa = '';
  }

  exibirGrafico(suino: Suino) {
    if (suino.id == this.suinoParaGrafico.id)
      this.suinoParaGrafico = {} as Suino;
    else
      this.suinoParaGrafico = suino;
  }

  abreDialogoDelete(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { 
        title: 'Excluir suíno',
        message: 'Deseja realmente excluir este suíno?' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirAnimal(id);
      } else {
        console.log('Operação cancelada pelo usuário.');
      }
    });
  }
}
