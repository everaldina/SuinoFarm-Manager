import { Suino } from '../models/suino';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MedidaPeso } from '../models/medida-peso';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  endpoint = 'https://p015-34a3b-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  addSuino(suino: Suino) {
    this.http
      .post(this.endpoint + '/suinos.json', suino)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getSuinos(): Suino[]{
    const suinos: Suino[] = [];
    this.http.get<Suino[]>(this.endpoint + '/suinos.json').pipe(retry(2), catchError(this.handleError)).subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          suinos.push({ ...response[key], id: key });
        }
      }
    });
    //return this.http.get<Suino[]>(this.endpoint + '/suinos.json').pipe(retry(2), catchError(this.handleError));
    return suinos;
  }

  getSuino(id: string): Suino | null{
    let suino: Suino = {} as Suino;
    this.http.get<Suino>(this.endpoint + `/suinos/${id}.json`).pipe(retry(2), catchError(this.handleError)).subscribe((response) => {
      suino = { ...response, id };
    });
    if (suino.id === undefined) 
      return null;
    else
      return suino;
    //return this.http.get<Suino>(this.endpoint + `/suinos/${id}.json`).pipe(retry(2), catchError(this.handleError));
  }

  addPeso(id: string, peso: MedidaPeso) {
    this.http
      .post(this.endpoint + `/suinos/${id}/${id}.json`, peso)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPesos(id: string): MedidaPeso[]{
    const pesos: MedidaPeso[] = [];
    this.http.get<MedidaPeso[]>(this.endpoint + `/suinos/${id}/${id}.json`).pipe(retry(2), catchError(this.handleError)).subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          pesos.push({ ...response[key], id: key });
        }
      }
    });
    return pesos;
  }

  updatePese(peso: MedidaPeso) {
    return this.http
      .put<MedidaPeso>(this.endpoint + `/suinos/${peso.id}/${peso.id}.json`, peso, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
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
