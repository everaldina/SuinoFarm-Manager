import { MedidaPeso } from './../models/medida-peso';
import { Suino } from '../models/suino';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
    this.http
      .post(this.endpoint + '/suinos.json', suino)
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
      .post(this.endpoint + `/suinos/pesos/${id}.json`, peso)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPesos(id: string): Observable<MedidaPeso[]> {
    return this.http
      .get<MedidaPeso[]>(this.endpoint + `/suinos/pesos/${id}.json`)
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
        this.endpoint + `/suinos/pesos/${id_porco}/${id_medida}.json`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePeso(id_porco: string, peso: MedidaPeso) {
    this.http
      .put<MedidaPeso>(
        this.endpoint + `/suinos/pesos/${id_porco}/${peso.id}.json`,
        peso,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .subscribe((response) => {
        console.log(response);
      });
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
