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
import { DatePipe } from '@angular/common';

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
  valorFiltro: string = '';
  valorPesquisa: any = '';


  constructor(
    private database: DatabaseService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe,
  ) {
    this.formCadastro = this.formBuilder.group({
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      atividades: this.formBuilder.array([], {
        validators: this.minimoSelecionado(),
      })
    });
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

      this.listaSuinos.forEach((suino) => {
        this.formCadastro.addControl(suino.id, this.formBuilder.control(false));
      });
    });

  }
  
  checkAtividade(marcado: boolean) {
    this.suinosFiltrados.forEach((suino) => {
      let id = suino.id;
      console.log(id);
      this.formCadastro.get(id)?.setValue(marcado);
    });
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

  filtrarDataNascimento(data: Date){
    let data_pesquisa = this.dataPipe.transform(data, 'yyyy-MM-dd');
    return this.listaSuinos.filter(suino => suino.dataNascimento === data_pesquisa);
  }

  filtrarDataSaida(data: Date){
    let data_pesquisa = this.dataPipe.transform(data, 'yyyy-MM-dd');
    return this.listaSuinos.filter(suino => suino.dataSaida === data_pesquisa);
  }

  filtrarPai(brinco_pai: string){
    return this.listaSuinos.filter(suino => suino.brincoPai === brinco_pai);
  }

  filtrarMae(brinco_mae: string){
    return this.listaSuinos.filter(suino => suino.brincoMae === brinco_mae);
  }

  filtrarSexo(sexo: string){
    return this.listaSuinos.filter(suino => suino.sexo === sexo);
  }

  filtrarStatus(status: string){
    return this.listaSuinos.filter(suino => suino.status === status);
  }

  filtrarListagem(filtro: string){
    switch (filtro){
      case 'brincoPai':
        this.suinosFiltrados = this.filtrarPai(this.valorPesquisa.toString());
        break;

      case 'brincoMae':
        this.suinosFiltrados = this.filtrarMae(this.valorPesquisa.toString());
        break;

      case 'dataNascimento':
        this.suinosFiltrados = this.filtrarDataNascimento(this.valorPesquisa);
        break;

      case 'dataSaida':
        this.suinosFiltrados = this.filtrarDataSaida(this.valorPesquisa);
        break;

      case 'sexo':
        this.suinosFiltrados = this.filtrarSexo(this.valorPesquisa);
        break;

      case 'status':
        this.suinosFiltrados = this.filtrarStatus(this.valorPesquisa);
        break;
    }
  }

  limparFiltro(){
    this.suinosFiltrados = this.listaSuinos;
    this.valorPesquisa = '';
  }

}
