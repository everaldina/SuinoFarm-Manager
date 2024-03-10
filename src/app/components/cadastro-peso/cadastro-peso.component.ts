import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Suino } from '../../models/suino';

@Component({
  selector: 'app-cadastro-peso',
  templateUrl: './cadastro-peso.component.html',
  styleUrl: './cadastro-peso.component.css'
})
export class CadastroPesoComponent {
  formCadastro: FormGroup;
  suinos: Suino[] = [];

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
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

    console.log(this.suinos);
  }

  cadastrarPeso(): void {
    if (this.formCadastro.valid) {
      console.log(this.formCadastro.value);
      
      this.formCadastro.reset();
    }
  }
}

