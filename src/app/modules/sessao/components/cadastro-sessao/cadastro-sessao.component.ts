import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../../../models/atividade';
import { DatabaseService } from '../../../../services/database.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Suino } from '../../../../models/suino';
import { DatePipe } from '@angular/common';
import { Sessao } from '../../../../models/sessao';

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
  minDate = new Date();

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
          if ('status' in suinos[key] && suinos[key].status === 'Ativo')
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
    if (this.formCadastro.invalid){
      if (this.formCadastro.get('atividades')?.hasError('selecaoInvalida')){
        alert('Selecione ao menos uma atividade');
      }
    } else {
      let idSuinos: string[] = [];
      let suinoSelecionado = false;
      for (const key in this.formCadastro.value) {
        if (key !== 'descricao' && key !== 'data' && key !== 'atividades') {
          suinoSelecionado = suinoSelecionado || this.formCadastro.value[key];
          if (this.formCadastro.value[key]) {
            idSuinos.push(key);
          }
          
        }
      }
      if (!suinoSelecionado){
        alert('Selecione ao menos um suíno');
        return;
      }
      
      let data = this.formCadastro.value.data;
      data = this.dataPipe.transform(data, 'yyyy-MM-dd') ?? '';

      let sessao: Sessao = {
        id: '',
        descricao: this.formCadastro.value.descricao,
        data: data,
        status: false
      }


      this.database.addSessao(sessao, this.formCadastro.value.atividades, idSuinos);
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

  filtrarBrinco(brinco: string){
    return this.listaSuinos.filter(suino => suino.brincoAnimal === brinco);
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

  filtrarListagem(filtro: string){
    switch (filtro){
      case 'brinco':
        this.suinosFiltrados = this.filtrarBrinco(this.valorPesquisa.toString());
        break;
      case 'brincoPai':
        this.suinosFiltrados = this.filtrarPai(this.valorPesquisa.toString());
        break;

      case 'brincoMae':
        this.suinosFiltrados = this.filtrarMae(this.valorPesquisa.toString());
        break;

      case 'dataNascimento':
        this.suinosFiltrados = this.filtrarDataNascimento(this.valorPesquisa);
        break;


      case 'sexo':
        this.suinosFiltrados = this.filtrarSexo(this.valorPesquisa);
        break;

    }
  }

  limparFiltro(){
    this.suinosFiltrados = this.listaSuinos;
    this.valorPesquisa = '';
  }

}
