import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  userName: string = 'Usuario'; // Cambiar dinámicamente según el contexto
  recetas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarRecetasAleatorias();
  }

  cargarRecetasAleatorias() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const recetasAleatorias: any[] = [];


    // Realiza 6 llamadas aleatorias a la API para obtener recetas
    for (let i = 0; i < 6; i++) {
      this.http.get(url).subscribe((response: any) => {
        recetasAleatorias.push(response.meals[0]);
        if (recetasAleatorias.length === 6) {
          this.recetas = recetasAleatorias;
        }
      });
    }
  }

}
