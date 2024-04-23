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

  constructor(private rotas: Router, private autenticacao: AutenticacaoService) {

  }

  paraCadastroPeso() {
    this.rotas.navigate(['/pesos/cadastro']);
  }

  paraEdicaoPeso() {
    this.rotas.navigate(['/pesos/editar']);
  }

  paraCadastroSuino() {
    this.rotas.navigate(['/suinos/cadastro']);
  }

  paraListaSuinos() {
    this.rotas.navigate(['suinos/listar']);
  }

  paraLogin() {
    this.rotas.navigate(['login']);
  }

  paraHome() {
    this.rotas.navigate(['']);
  }

  paraCadastroAtividade() {
    this.rotas.navigate(['sessoes/cadastro-atividade']);
  }

  paraCadastroSessao() {
    this.rotas.navigate(['sessoes/cadastro-sessao']);
  }

  paraListaSessoes() {
    this.rotas.navigate(['sessoes/listar-sessoes']);
  }

  isLoggedIn(): boolean {
    return this.autenticacao.isLoggedIn();
  }
}
