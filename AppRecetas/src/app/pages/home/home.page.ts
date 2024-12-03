import { Component } from '@angular/core';
import { ApiControllerService } from 'src/app/services/api-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private api: ApiControllerService,) {}

  users: any[] = [];
  
  cargarUsuarios() {
    this.api.obtenerUsuarios().subscribe(
      (data) => {
        this.users = data
        console.log(this.users)
      },
      (error) => {
        console.log("ERROR en la llamada", error)
      }
    )
  }
}
