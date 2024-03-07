import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuinoFarm-Manager';

  constructor(private rotas: Router, private rotaAtiva: ActivatedRoute){
    
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

  paraGraficoPeso() {
    this.rotas.navigate(['graficoPeso']);
  }

  paraListaSuinos() {
    this.rotas.navigate(['listaSuinos']);
  }

  fechar() {
    this.rotas.navigate(['']);
  }
  
}
