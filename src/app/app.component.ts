import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from './modules/auth/autenticacao.service';

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
    this.rotas.navigate(['cadastroSuino']);
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

  paraCadastroAtividade() {
    this.rotas.navigate(['cadastroAtividade']);
  }

  paraCadastroSessao() {
    this.rotas.navigate(['cadastroSessao']);
  }

  paraListaSessoes() {
    this.rotas.navigate(['listaSessoes']);
  }

  isLoggedIn(): boolean {
    return this.autenticacao.isLoggedIn();
  }
}
