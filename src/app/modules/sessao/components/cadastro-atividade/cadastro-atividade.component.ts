import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Atividade } from '../../models/atividade';

@Component({
  selector: 'app-cadastro-atividade',
  templateUrl: './cadastro-atividade.component.html',
  styleUrl: './cadastro-atividade.component.css'
})
export class CadastroAtividadeComponent {

  formularioAtividade : FormGroup;

  constructor(private database: DatabaseService) {
    this.formularioAtividade = new FormGroup({
      'descricao': new FormControl(null, [
          Validators.required
      ])
    })
  }

  onSubmit(){
    if(this.formularioAtividade.valid){
      let resposta = this.formularioAtividade.value;
      let atividade: Atividade = {
        id: '',
        descricao: resposta.descricao
      }
      console.log("Formulário válido", atividade);

      this.database.addAtividade(atividade)
      console.log(this.database.getAtividades());

      this.formularioAtividade.reset();
    }
    else{
      console.log("Formulário inválido");
    }
  }

}
