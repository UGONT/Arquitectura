import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiThemealbdService {

  apiURL = "https://e3rg1vlt91.execute-api.us-east-1.amazonaws.com/dev/"

  constructor(private http: HttpClient) { }

  obtenerRecetas(recetaData: any): Observable<any> {
    return this.http.post(`${this.apiURL}create_recipe`, recetaData).pipe(
      catchError((error) => {
        console.error('Error al registrar receta:', error);
        alert('Hubo un error al registrar la receta. Por favor, inténtalo de nuevo.');
        return throwError(() => new Error(`Error al registrar receta: ${error.message}`));
      })
    );
  }
}
