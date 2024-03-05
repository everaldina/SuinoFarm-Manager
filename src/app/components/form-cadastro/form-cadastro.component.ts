import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrl: './form-cadastro.component.css'
})
export class FormCadastroComponent {

  formularioSuino: FormGroup;
  listaStatus: string[] = ['Ativo', 'Vendido', 'Morto'];
  listaSexos: string[] = ['M', 'F'];

  constructor(){
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
    if(this.formularioSuino.valid)
      console.log("Formulário válido", this.formularioSuino.value);
    else
      console.log("Formulário inválido")
  }
}
