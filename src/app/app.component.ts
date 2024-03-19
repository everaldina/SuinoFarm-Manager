import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuinoFarm-Manager';

  constructor(private rotas: Router, private rotaAtiva: ActivatedRoute, private autenticacao: AutenticacaoService) {

  }

  paraCadastroPeso() {
    this.rotas.navigate(['cadastroPeso']);
  }

  paraEdicaoPeso() {
    this.rotas.navigate(['edicaoPeso']);
  }

  paraFormCadastro() {
    this.rotas.navigate(['formCadastro']);
  }

  paraListaSuinos() {
    this.rotas.navigate(['listaSuinos']);
  }

  paraLogin() {
    this.rotas.navigate(['login']);
  }

  paraHome() {
    this.rotas.navigate(['']);
  }

  isLoggedIn(): boolean {
    return this.autenticacao.isLoggedIn();
  }
}
