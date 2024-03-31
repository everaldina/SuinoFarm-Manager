import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Sessao } from '../../models/sessao';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Atividade } from '../../models/atividade';
import { Suino } from '../../models/suino';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-finalizar-sessao',
  templateUrl: './finalizar-sessao.component.html',
  styleUrl: './finalizar-sessao.component.css'
})
export class FinalizarSessaoComponent implements OnInit{
  sessao: Sessao | undefined;
  atividadesSessao: Atividade[] = [];
  atividades: Atividade[] = [];
  suinos: Suino[] = [];
  id = '';

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute) {
    
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
            if (!this.atividadesSessao.some(atividade => atividade.id === key)){
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
    });
  }

  finalizarSessao(): void {
    // this.databaseService.finalizarSessao(this.id);
  }
}
