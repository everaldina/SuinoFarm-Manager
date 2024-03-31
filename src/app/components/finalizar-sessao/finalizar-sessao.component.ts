import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Sessao } from '../../models/sessao';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Atividade } from '../../models/atividade';
import { Suino } from '../../models/suino';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-finalizar-sessao',
  templateUrl: './finalizar-sessao.component.html',
  styleUrl: './finalizar-sessao.component.css'
})
export class FinalizarSessaoComponent implements OnInit {
  sessao: Sessao | undefined;
  atividadesSessao: Atividade[] = [];
  atividades: Atividade[] = [];
  suinos: Suino[] = [];
  id = '';

  formSuinos: FormGroup = new FormGroup({});
  listaSuinos: Suino[] = [];
  suinosFiltrados: Suino[] = [];
  valorFiltro: string = '';
  valorPesquisa: any = '';
  minDate = new Date();

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute, private formBuilder: FormBuilder, private dataPipe: DatePipe) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.databaseService.getSessao(this.id).subscribe((response: Sessao) => {
      this.sessao = response;
    });

    this.databaseService.getAtividadesSessao(this.id).subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.atividadesSessao.push({ ...response[key], id: key });
        }
      }

      this.databaseService.getAtividades().subscribe((response) => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (this.atividadesSessao.some(atividade => atividade.id === response[key].id)) {
              this.atividades.push({ ...response[key], id: key });
            }
          }
        }
      });
    });

    this.databaseService.getSuinosSessao(this.id).subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.suinos.push({ ...response[key], id: key });
        }
      }

      this.databaseService.getSuinos().subscribe((response) => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (this.suinos.some(suino => suino.id === key)) {
              this.listaSuinos.push({ ...response[key], id: key });
            }
          }
        }
      });

      // this.listaSuinos = this.suinos;

      this.suinosFiltrados = this.listaSuinos;

      this.listaSuinos.forEach((suino) => {
        this.formSuinos.addControl(suino.id, this.formBuilder.control(false));
      });
    });
  }


  checkAtividade(marcado: boolean) {
    this.suinosFiltrados.forEach((suino) => {
      let id = suino.id;
      this.formSuinos.get(id)?.setValue(marcado);
    });
  }

  filtrarDataNascimento(data: Date){
    let data_pesquisa = this.dataPipe.transform(data, 'yyyy-MM-dd');
    return this.listaSuinos.filter(suino => suino.dataNascimento === data_pesquisa);
  }

  filtrarBrinco(brinco: string){
    return this.listaSuinos.filter(suino => suino.brincoAnimal === brinco);
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

  filtrarListagem(filtro: string){
    switch (filtro){
      case 'brinco':
        this.suinosFiltrados = this.filtrarBrinco(this.valorPesquisa.toString());
        break;
      case 'brincoPai':
        this.suinosFiltrados = this.filtrarPai(this.valorPesquisa.toString());
        break;

      case 'brincoMae':
        this.suinosFiltrados = this.filtrarMae(this.valorPesquisa.toString());
        break;

      case 'dataNascimento':
        this.suinosFiltrados = this.filtrarDataNascimento(this.valorPesquisa);
        break;


      case 'sexo':
        this.suinosFiltrados = this.filtrarSexo(this.valorPesquisa);
        break;

    }
  }

  limparFiltro(){
    this.suinosFiltrados = this.listaSuinos;
    this.valorPesquisa = '';
  }

  nextStep(): void {
    this.limparFiltro();

    let suinosSelecionados = this.suinosFiltrados.filter(suino => this.formSuinos.get(suino.id)?.value);
    let atividadesSelecionadas = this.atividades.filter(atividade => this.formSuinos.get(atividade.id)?.value);

  }

  finalizarSessao(): void {
    // this.databaseService.finalizarSessao(this.id);
  }
}
