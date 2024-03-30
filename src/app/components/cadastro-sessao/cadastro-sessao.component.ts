import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../models/atividade';
import { DatabaseService } from '../../services/database.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Suino } from '../../models/suino';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cadastro-sessao',
  templateUrl: './cadastro-sessao.component.html',
  styleUrl: './cadastro-sessao.component.css',
})
export class CadastroSessaoComponent implements OnInit{
  listaAtividades: Atividade[] = [];
  atividadesSelecionadas: string[] = [];
  listaSuinos: Suino[] = [];
  suinosFiltrados: Suino[] = [];
  formCadastro: FormGroup = new FormGroup({});
  suinos: FormGroup = new FormGroup({});

  constructor(
    private database: DatabaseService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.database.getAtividades().subscribe((atividades) => {
      for (const key in atividades) {
        if (atividades.hasOwnProperty(key)) {
          this.listaAtividades.push({ ...atividades[key], id: key });
        }
      }
    });

    this.database.getSuinos().subscribe((suinos) => {
      this.listaSuinos = [];
      
      for (const key in suinos) {
        if (suinos.hasOwnProperty(key)) {
          this.listaSuinos.push({ ...suinos[key], id: key });
        }
      }
      
      this.suinosFiltrados = this.listaSuinos;
      
      const formControls: { [key: string]: FormControl<boolean | null> } = {};
      this.listaSuinos.forEach((suino) => {
        formControls[suino.id] = this.formBuilder.control(false);
      });
      
      this.suinos = this.formBuilder.group(formControls);
    });

    this.formCadastro = this.formBuilder.group({
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      atividades: this.formBuilder.array([], {
        validators: this.minimoSelecionado(),
      }),
      suinos: this.suinos
    });

  }

  updateFormValue(checked: boolean, controlId: string) {
    this.suinos.controls[controlId].setValue(checked);
  }
  
  checkAtividade(marcado: boolean) {
    this.suinosFiltrados.forEach((suino) => {
      let id = suino.id;
      console.log(id);
      this.suinos.get(id)?.patchValue(marcado);
    });
    console.log(this.suinos.value);
    this.cdRef.detectChanges();
  }
  minimoSelecionado(minimo: number = 1): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.length < minimo) {
        return { selecaoInvalida: { value: control.value } };
      }
      return null;
    };
  }

  cadastrarSessao(): void {
    if (this.formCadastro.valid) {
      console.log(this.formCadastro.value);
    }
  }

  get atividades(): FormArray {
    return this.formCadastro.get('atividades') as FormArray;
  }

  selectAtividade(idAtividade: string): void {
    const atividadesArray = this.atividades;
    if (atividadesArray.value.includes(idAtividade)) {
      const index = atividadesArray.value.indexOf(idAtividade);
      atividadesArray.removeAt(index);
    } else {
      atividadesArray.push(this.formBuilder.control(idAtividade));
    }
  }

}
