import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Suino } from '../../models/suino';
import { MedidaPeso } from '../../models/medida-peso';

@Component({
  selector: 'app-edicao-peso',
  templateUrl: './edicao-peso.component.html',
  styleUrl: './edicao-peso.component.css'
})
export class EdicaoPesoComponent {
  formEdicao: FormGroup;
  suinos: Suino[] = [];
  selectedSuino: Suino | undefined;
  pesagens: MedidaPeso[] = [];
  selectedPesagem: MedidaPeso | undefined;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.formEdicao = this.formBuilder.group({
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

  onBrincoSelectionChange(brinco: string) {
    this.selectedSuino = this.suinos.find(suino => suino.brincoAnimal === brinco);

    this.formEdicao.get('data')?.setValue('');
    this.formEdicao.get('peso')?.setValue('');

    this.pesagens = [];

    if (this.selectedSuino) {
      this.databaseService.getPesos(this.selectedSuino.id).subscribe((response) => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            this.pesagens.push({ ...response[key], id: key });
          }
        }
      });
    }
  }

  onDataSelectionChange(data: string) {
    this.selectedPesagem = this.pesagens.find(pesagem => pesagem.data_medida === data);

    if (this.selectedPesagem) {
      this.formEdicao.get('peso')?.setValue(this.selectedPesagem.peso);
    }
  }

  editarPeso(): void {
    if (this.selectedSuino && this.formEdicao.valid){
      let medidaPeso: MedidaPeso = {
        id: this.selectedPesagem?.id || '',
        data_medida: this.selectedPesagem?.data_medida || '',
        peso: this.formEdicao.get('peso')?.value
      };

      this.databaseService.updatePeso(this.selectedSuino.id, medidaPeso);
      this.formEdicao.reset();
    }
  }
}
