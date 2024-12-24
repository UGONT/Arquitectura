import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscar-recetas-themealbd',
  templateUrl: './buscar-recetas-themealbd.page.html',
  styleUrls: ['./buscar-recetas-themealbd.page.scss'],
})
export class BuscarRecetasThemealbdPage {
  categories: string[] = [
    'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork',
    'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat',
  ];
  categoriasTraducciones: Record<string, string> = {
    Beef: 'Carne de res',
    Chicken: 'Pollo',
    Dessert: 'Postre',
    Lamb: 'Cordero',
    Miscellaneous: 'Misceláneo',
    Pasta: 'Pasta',
    Pork: 'Cerdo',
    Seafood: 'Mariscos',
    Side: 'Acompañamiento',
    Starter: 'Entrante',
    Vegan: 'Vegano',
    Vegetarian: 'Vegetariano',
    Breakfast: 'Desayuno',
    Goat: 'Cabra',
  };
  selectedCategory: string = '';
  recetas: any[] = [];
  searched: boolean = false;

  constructor(private http: HttpClient) {}

  buscarRecetas() {
    if (!this.selectedCategory) return;

    const categoryEnglish = this.selectedCategory;
    this.http
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryEnglish}`)
      .subscribe((response: any) => {
        this.recetas = response.meals || [];
        this.searched = true;
      });
  }
}
