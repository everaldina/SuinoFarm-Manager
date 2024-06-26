import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../../../services/database.service';
import { Suino } from '../../../../models/suino';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastro-suino',
  templateUrl: './cadastro-suino.component.html',
  styleUrl: './cadastro-suino.component.css'
})
export class CadastroSuinoComponent {

  formularioSuino: FormGroup;
  listaStatus: string[] = ['Ativo', 'Vendido', 'Morto'];
  listaSexos: string[] = ['M', 'F'];
  today = new Date();

  constructor(private database: DatabaseService, private datePipe: DatePipe) {
    this.today.setDate(this.today.getDate());
    
    this.formularioSuino = new FormGroup({
      'brincoAnimal': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
      ]),

      'brincoPai': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
      ]),

      'brincoMae': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)          
      ]),

      'dataNascimento': new FormControl(null, [
          Validators.required
      ]),

      'dataSaida': new FormControl(null, [
          Validators.required
      ]),

      'status': new FormControl(null, [
          Validators.required
      ]),

      'sexo': new FormControl(null, [
          Validators.required
      ]),
    })
  }

  onSubmit(){
    if(this.formularioSuino.valid){
      let resposta = this.formularioSuino.value;
      let suino: Suino = {
        id: '',
        brincoAnimal: resposta.brincoAnimal,
        brincoPai: resposta.brincoPai,
        brincoMae: resposta.brincoMae,
        dataNascimento: this.datePipe.transform(resposta.dataNascimento, 'yyyy-MM-dd') ?? '',
        dataSaida: this.datePipe.transform(resposta.dataSaida, 'yyyy-MM-dd') ?? '',
        status: resposta.status,
        sexo: resposta.sexo
      }
      console.log("Formulário válido", suino);

      this.database.addSuino(suino)
      
      this.formularioSuino.reset();
    }
    else{
      console.log("Formulário inválido");
    }
  }
}
