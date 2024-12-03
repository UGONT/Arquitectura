import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  apiURL = "https://e3rg1vlt91.execute-api.us-east-1.amazonaws.com/dev/"

  constructor(private http: HttpClient) { }

  obtenerUsuarios():Observable<any>{
    return this.http.get(this.apiURL+"get_users"); 
   }
}
