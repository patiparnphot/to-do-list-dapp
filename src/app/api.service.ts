import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

const port = 1210;
const apiUrl = `https://rinkeby-backend.herokuapp.com`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.message}`);
    window.alert(error.message);
    return throwError(
      'Something bad happened; please try again later.');
  }

  getTodoList(): Observable<any> {
    return this.http.get<string[]>(apiUrl)
      .pipe(
        tap(res => console.log(`fetched todos`)),
        catchError(this.handleError)
      );
  }

  getTodo(index: number): Observable<any> {
    const url = `${apiUrl}/${index}`;
    return this.http.get<string>(url).pipe(
      catchError(this.handleError)
    );
  }

  addTodo(todo: string): Observable<any> {
    return this.http.post(apiUrl, {todo: todo}, { responseType: 'text'}).pipe(
      tap(res => console.log(`added todo w/tx ${res}`)),
      catchError(this.handleError)
    );
  }

  updateTodo(index: number, todo: string): Observable<any> {
    const url = `${apiUrl}/${index}`;
    return this.http.put(url, {todo: todo}, { responseType: 'text'}).pipe(
      tap(res => console.log(`edited todo w/tx ${res}`)),
      catchError(this.handleError)
    );
  }

  deleteTodo(index: number): Observable<any> {
    const url = `${apiUrl}/${index}`;
    return this.http.delete(url, { responseType: 'text'}).pipe(
      tap(res => console.log(`deleted todo w/tx ${res}`)),
      catchError(this.handleError)
    );
  }
}
