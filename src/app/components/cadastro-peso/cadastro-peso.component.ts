import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-peso',
  templateUrl: './cadastro-peso.component.html',
  styleUrl: './cadastro-peso.component.css'
})
export class CadastroPesoComponent {
  formCadastro: FormGroup;
  suinos: any[];

  constructor(private formBuilder: FormBuilder, private suinoService: SuinoService) {
    this.formCadastro = this.formBuilder.group({
      brinco: ['', Validators.required],
      data: ['', Validators.required],
      peso: ['', Validators.required]
    });

    this.suinoService.suinos$.subscribe(suinos => {
      this.suinos = suinos;
    });
  }

    cadastrarPeso(): void {
      if (this.formCadastro.valid) {
        console.log(this.formCadastro.value);
        // Aqui você pode enviar os dados para o backend
        this.formCadastro.reset();
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    }
  }

