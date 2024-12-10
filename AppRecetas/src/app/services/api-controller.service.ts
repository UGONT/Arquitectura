import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  apiURL = "https://e3rg1vlt91.execute-api.us-east-1.amazonaws.com/dev/"
  baseUrl = '/api/';

  constructor(private http: HttpClient) { }

  getAuthToken(): string | null {
    return localStorage.getItem('idToken');
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.apiURL + "get_users");
  }

  getRecetas(): Observable<any> {
    return this.http.get(this.apiURL + "get_recipes");
  }

  /* postReceta(data:any):Observable<any>{
    return this.http.post(this.apiURL+"create_recipe/",data);
  } */

  /* postReceta(data: any) {
    return this.http.post(this.baseUrl+"create_recipe/",data);
  } */

  /* postReceta(recetaData: any): Observable<any> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiURL, recetaData, { headers });
  } */

  postReceta(recetaData: any): Observable<any> {
    return this.http.post(`${this.apiURL}create_recipe`, recetaData).pipe(
      catchError((error) => {
        console.error('Error al registrar receta:', error);
        alert('Hubo un error al registrar la receta. Por favor, inténtalo de nuevo.');
        return throwError(() => new Error(`Error al registrar receta: ${error.message}`));
      })
    );
  }

  updateReceta(recetaData: any): Observable<any> {
    return this.http.put(`${this.apiURL}update_recipe`, recetaData).pipe(
      catchError((error) => {
        console.error('Error al modificar receta:', error);
        alert('Hubo un error al modificar la receta. Por favor, inténtalo de nuevo.');
        return throwError(() => new Error(`Error al modificar receta: ${error.message}`));
      })
    );
  }

  deleteReceta(recetaId: number): Observable<any> {
    return this.http.delete(`${this.apiURL}delete_recipe?id=${recetaId}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar receta:', error);
        alert('Hubo un error al eliminar la receta. Por favor, inténtalo de nuevo.');
        return throwError(() => new Error(`Error al eliminar receta: ${error.message}`));
      })
    );
  }

  
}
