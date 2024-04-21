import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Sessao } from '../../models/sessao';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Atividade } from '../../models/atividade';
import { Suino } from '../../models/suino';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute, private formBuilder: FormBuilder, private dataPipe: DatePipe, private router: Router) {
    this.formSuinos = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.databaseService.getSessao(this.id).subscribe((response: Sessao) => {
      this.sessao = response;
      this.sessao.id = this.id;
    });

    this.databaseService.getAtividadesSessao(this.id).subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.atividadesSessao.push({ ...response[key], id: response[key].id });
        }
      }

      for (const atividade of this.atividadesSessao) {
        this.databaseService.getAtividade(atividade.id).subscribe((response: Atividade) => {
          response.id = atividade.id;
          this.atividades.push(response);
        });
      }
    });


    this.databaseService.getSuinosSessao(this.id).subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.suinos.push({ ...response[key], id: response[key].id });
        }
      }

      const requests = this.suinos.map(suino =>
        this.databaseService.getSuino(suino.id)
      );

      forkJoin(requests).subscribe((suinoResponses: Suino[]) => {
        this.listaSuinos = suinoResponses.map((response, index) => ({
          ...response,
          id: this.suinos[index].id
        }));

        this.suinosFiltrados = this.listaSuinos;

        this.listaSuinos.forEach((suino) => {
          this.formSuinos.addControl(suino.id, this.formBuilder.control(true));
        });
      });
    });
  }

  checkAtividade(marcado: boolean) {
    this.suinosFiltrados.forEach((suino) => {
      let id = suino.id;
      this.formSuinos.get(id)?.setValue(marcado);
    });
  }

  filtrarDataNascimento(data: Date) {
    let data_pesquisa = this.dataPipe.transform(data, 'yyyy-MM-dd');
    return this.listaSuinos.filter(suino => suino.dataNascimento === data_pesquisa);
  }

  filtrarBrinco(brinco: string) {
    return this.listaSuinos.filter(suino => suino.brincoAnimal === brinco);
  }

  filtrarPai(brinco_pai: string) {
    return this.listaSuinos.filter(suino => suino.brincoPai === brinco_pai);
  }

  filtrarMae(brinco_mae: string) {
    return this.listaSuinos.filter(suino => suino.brincoMae === brinco_mae);
  }

  filtrarSexo(sexo: string) {
    return this.listaSuinos.filter(suino => suino.sexo === sexo);
  }

  filtrarListagem(filtro: string) {
    switch (filtro) {
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

      case '':
        this.suinosFiltrados = this.listaSuinos;
        break;
    }
  }

  limparFiltro(){
    this.suinosFiltrados = this.listaSuinos;
    this.valorPesquisa = '';
  }

  nextStep(atividade: Atividade): void {
    if(this.sessao){
      for(const suino of this.listaSuinos){
        this.databaseService.mudarStatusAtividade(this.sessao.id, atividade.id, suino.id, this.formSuinos.get(suino.id)?.value);
      }
    }
  }

  finalizarSessao(): void {
    this.databaseService.mudarStatusSessao(this.id, true);

    alert('Sessão finalizada com sucesso!');

    this.router.navigate(['/listaSessoes']);
  }
}
