import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../../../services/database.service';
import { Suino } from '../../../../models/suino';
import { MedidaPeso } from '../../../../models/medida-peso';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastro-peso',
  templateUrl: './cadastro-peso.component.html',
  styleUrl: './cadastro-peso.component.css'
})
export class CadastroPesoComponent {
  formCadastro: FormGroup;
  suinos: Suino[] = [];
  cadastroPeso = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private datePipe: DatePipe) {
    this.formCadastro = this.formBuilder.group({
      brinco: ['', Validators.required],
      data: ['', Validators.required],
      peso: ['', Validators.required]
    });

    this.databaseService.getSuinos().subscribe((response) => {
       for (const key in response) {
         if (response.hasOwnProperty(key)) {
           this.suinos.push({ ...response[key], id: key });
         }
       }
    });
  }

  cadastrarPeso(): void {
    if (this.formCadastro.valid) {
      
      let peso: MedidaPeso = {
        id : '',
        data_medida: this.datePipe.transform(this.formCadastro.value.data, 'yyyy-MM-dd') ?? '',
        peso: this.formCadastro.value.peso
      };

      let id = this.suinos.find(suino => suino.brincoAnimal === this.formCadastro.value.brinco)?.id;

      if (id) {
        this.databaseService.addPeso(id, peso);

        this.formCadastro.reset();
      }
    }
    //else{
    //  // teste de pesos
    //  // pegar todos os pesos de um suíno
    //  let pesos: MedidaPeso[] = [];
    //  this.databaseService.getPesos("-NsYguoo6JOR_DLaOP7t").subscribe((response) => {
    //    for (const key in response) {
    //      if (response.hasOwnProperty(key)) {
    //        pesos.push({ ...response[key], id: key });
    //      }
    //    }
    //    console.log("Pesos do suino -NsYguoo6JOR_DLaOP7t");
    //    console.log(pesos);
    //  });
    //  // pegar peso especifico de um suino
    //  this.databaseService.getPeso("-NsYguoo6JOR_DLaOP7t", "-Nsdq2jg4FmfvvrRDCIS").subscribe((response) => {
    //    console.log("Peso especifico do suino -NsYguoo6JOR_DLaOP7t");
    //    console.log(response);
    //  });
    //}
  }
}

