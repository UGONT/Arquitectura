import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  apiURL = "https://e3rg1vlt91.execute-api.us-east-1.amazonaws.com/dev/"

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

  postReceta(recetaData: any): Observable<any> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiURL, recetaData, { headers });
  }
}
