import { Sessao } from './../models/sessao';
import { MedidaPeso } from './../models/medida-peso';
import { Suino } from '../models/suino';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Atividade } from '../models/atividade';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  endpoint = 'https://p015-34a3b-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addSuino(suino: Suino) {
    const brinco = suino.brincoAnimal;

    this.getSuinosByBrinco(brinco).subscribe((response) => {
      if (Object.keys(response).length === 0) {
        this.http
          .post(this.endpoint + '/suinos.json', suino)
          .subscribe((response) => {
            console.log(response);
          });
      } else {
        alert('Brinco já cadastrado');
      }
    });
  }

  deleteSuino(id: string) {
    this.http
      .delete(this.endpoint + `/suinos/${id}.json`)
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateSuino(id: string, suino: Suino) {
    this.http
      .put<Suino>(this.endpoint + `/suinos/${id}.json`, suino, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .subscribe((response) => {
        console.log(response);
      });
  }

  getSuinos(): Observable<Suino[]> {
    return this.http
      .get<Suino[]>(this.endpoint + '/suinos.json')
      .pipe(retry(2), catchError(this.handleError));
    //.subscribe((response) => {
    //  for (const key in response) {
    //    if (response.hasOwnProperty(key)) {
    //      suinos.push({ ...response[key], id: key });
    //    }
    //  }
  }

  getSuino(id: string): Observable<Suino> {
    return this.http
      .get<Suino>(this.endpoint + `/suinos/${id}.json`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSuinosByBrinco(brinco: string): Observable<Suino> {
    return this.http
      .get<Suino>(
        this.endpoint +
          `/suinos.json?orderBy="brincoAnimal"&equalTo="${brinco}"`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getSuinosByPai(brinco_pai: string): Observable<Suino[]> {
    return this.http
      .get<Suino[]>(
        this.endpoint +
          `/suinos.json?orderBy="brincoPai"&equalTo="${brinco_pai}"`
      )
      .pipe(retry(2), catchError(this.handleError));
    //.subscribe((response) => {
    //  for (const key in response) {
    //    if (response.hasOwnProperty(key)) {
    //      suinos.push({ ...response[key], id: key });
    //    }
    //  }
  }

  getSuinosByMae(brinco_mae: string): Observable<Suino[]> {
    return this.http
      .get<Suino[]>(
        this.endpoint +
          `/suinos.json?orderBy="brincoPai"&equalTo="${brinco_mae}"`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getSuinosByStatus(status: string): Observable<Suino[]> {
    return this.http
      .get<Suino[]>(
        this.endpoint + `/suinos.json?orderBy="status"&equalTo="${status}"`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getSuinosBySexo(sexo: string): Observable<Suino[]> {
    return this.http
      .get<Suino[]>(
        this.endpoint + `/suinos.json?orderBy="sexo"&equalTo="${sexo}"`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getSuinosByDataNascimento(data_nascimento: Date): Observable<Suino[]> {
    let dataPesquisa = `${data_nascimento.getFullYear()}-${data_nascimento.getMonth()}-${data_nascimento.getDate()}`;
    return this.http
      .get<Suino[]>(
        this.endpoint +
          `/suinos.json?orderBy="dataNascimento"&equalTo="${dataPesquisa}"`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getSuinosByDataSaida(data_saida: Date): Observable<Suino[]> {
    let ano = data_saida.getFullYear();
    let mes = data_saida.getMonth().toString().padStart(2, '0');
    let dia = data_saida.getDate().toString().padStart(2, '0');

    let dataPesquisa = `${ano}-${mes}-${dia}`;
    return this.http
      .get<Suino[]>(
        this.endpoint +
          `/suinos.json?orderBy="dataSaida"&equalTo="${dataPesquisa}"`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  addPeso(id: string, peso: MedidaPeso) {
    this.http
      .post(this.endpoint + `/suinos/${id}/pesos/.json`, peso)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPesos(id: string): Observable<MedidaPeso[]> {
    return this.http
      .get<MedidaPeso[]>(this.endpoint + `/suinos/${id}/pesos/.json`)
      .pipe(retry(2), catchError(this.handleError));
    //.subscribe((response) => {
    //  for (const key in response) {
    //    if (response.hasOwnProperty(key)) {
    //      pesos.push({ ...response[key], id: key });
    //    }
    //  }
  }

  getPeso(id_porco: string, id_medida: string): Observable<MedidaPeso> {
    return this.http
      .get<MedidaPeso>(
        this.endpoint + `/suinos/${id_porco}/pesos/${id_medida}.json`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePeso(id_porco: string, peso: MedidaPeso) {
    this.http
      .put<MedidaPeso>(
        this.endpoint + `/suinos/${id_porco}/pesos/${peso.id}.json`,
        peso,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .subscribe((response) => {
        console.log(response);
      });
  }

  addAtividade(atividade: Atividade) {
    this.http
      .post(this.endpoint + '/atividades.json', atividade)
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteAtividade(id: string) {
    this.http
      .delete(this.endpoint + `/atividades/${id}.json`)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getAtividades(): Observable<Atividade[]> {
    return this.http
      .get<Atividade[]>(this.endpoint + '/atividades.json')
      .pipe(retry(2), catchError(this.handleError));
  }

  getAtividade(id: string): Observable<Atividade> {
    return this.http
      .get<Atividade>(this.endpoint + `/atividades/${id}.json`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateAtividade(id: string, atividade: Atividade) {
    this.http
      .put<Atividade>(
        this.endpoint + `/atividades/${id}.json`,
        atividade,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .subscribe((response) => {
        console.log(response);
      });
  }

  getAtividadeByDesc(nome: string): Observable<Atividade> {
    return this.http
      .get<Atividade>(
        this.endpoint + `/atividades.json?orderBy="descricao"&equalTo="${nome}"`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  // os ids de atividades e suinos sao os ids do firebase
  addSessao(
    sessao: Sessao,
    listaAtividadesId: string[] = [],
    listaIdSuinos: string[] = [],
    status: boolean = true
  ) {
    if (listaAtividadesId.length !== 0 && listaIdSuinos.length !== 0) {
      this.http
        .post(this.endpoint + '/sessoes.json', sessao)
        .subscribe((response) => {
          if (response && 'name' in response) {
            let sessaoId: string = response['name'] as string;
            let suinos: any = {};
            listaIdSuinos.forEach((id) => {
              suinos[id] = status;
            });
            for (let i = 0; i < listaAtividadesId.length; i++) {
              let data = { ...suinos, id: listaAtividadesId[i]};
              this.http
                .post(
                  this.endpoint +
                    `/sessoes/${sessaoId}/atividades/.json`,
                  data
                )
                .subscribe((response) => {
                  console.log(response);
                });
            }
          }
        });
    }
  }

  deleteSessao(id: string) {
    this.http
      .delete(this.endpoint + `/sessoes/${id}.json`)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getSessoes(): Observable<Sessao[]> {
    return this.http
      .get<Sessao[]>(this.endpoint + '/sessoes.json')
      .pipe(retry(2), catchError(this.handleError));
  }

  getSessao(id: string): Observable<Sessao> {
    return this.http
      .get<Sessao>(this.endpoint + `/sessoes/${id}.json`)
      .pipe(retry(2), catchError(this.handleError));
  }

  // retorna os ids das atividades de uma sessao
  getAtividadesSessao(idSessao: string): Observable<Atividade[]> {
    return this.http
      .get<Atividade[]>(this.endpoint + `/sessoes/${idSessao}/atividades.json`)
      .pipe(
        retry(2),
        catchError(this.handleError),
        map((response) => {
          const atividades: Atividade[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              atividades.push({ descricao: '', id: response[key].id });
            }
          }
          return atividades;
        })
      );
  }

  // retorna um observabloe com os suinos e os status deles na atividade
  getSuinosSessao(idSessao: string): Observable<any[]> {
    return this.http
      .get<Suino[]>(this.endpoint + `/sessoes/${idSessao}.json`)
      .pipe(
        retry(2),
        catchError(this.handleError),
        map((sessao: any) => {
          if (
            sessao &&
            sessao.atividades &&
            Object.keys(sessao.atividades).length > 0
          ) {
            const suinos: any[] = [];
            let primeiraAtividade: any = Object.keys(sessao.atividades)[0];
            let objAtividade = sessao.atividades[primeiraAtividade];

            for (const suino in objAtividade) {
              if (suino !== 'id') {
                suinos.push({
                  id: suino,
                  status: objAtividade[suino],
                });
              }
            }
            return suinos;
          } else {
            return [];
          }
        })
      );
  }

  getStatusSuino(
    idSessao: string,
    idAtividade: string,
    idSuino: string
  ): Observable<boolean> {
    return this.http
      .get(
        this.endpoint + `/sessoes/${idSessao}/atividades/.json`
      )
      .pipe(
        retry(2),
        catchError(this.handleError),
        map((response: any) => {
          const keys = Object.keys(response);
          for (const key of keys) {
            const atividade = response[key];
            if (atividade.hasOwnProperty("id") && atividade["id"] === idAtividade) {
              return atividade[idSuino] as boolean;
            }
          }
          return false;
        })
      );
  }

  mudarStatusAtividade(
    idSessao: string,
    idAtividade: string,
    idSuino: string,
    status: boolean
  ) {
    this.http.get(this.endpoint + `/sessoes/${idSessao}/atividades/.json`).pipe(
      retry(2),
      catchError(this.handleError),
      map((response: any) => {
        console.log(response);
        const keys = Object.keys(response);
        for (const key of keys) {
          const atividade = response[key];
          if (atividade.hasOwnProperty("id") && atividade["id"] === idAtividade) {
            atividade[idSuino] = status;
            console.log(atividade);
            this.http.put(this.endpoint + `/sessoes/${idSessao}/atividades/${key}.json`, atividade).subscribe();
          }
        }
      })
    ).subscribe();
  }

  mudarStatusSessao(idSessao: string, status: boolean) {
    this.http.get(this.endpoint + `/sessoes/${idSessao}.json`).pipe(
      retry(2),
      catchError(this.handleError),
      map((response: any) => {
        response.status = status;
        this.http.put(this.endpoint + `/sessoes/${idSessao}.json`, response).subscribe();
      })
    ).subscribe();
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }

    return throwError(() => new Error('errorMessage'));
  }
}
