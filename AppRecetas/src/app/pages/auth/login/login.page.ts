import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificatorService } from 'src/app/services/authentificator.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private router: Router,
    private auth:AuthentificatorService
  ) { }

  async login() {
    try {
      const tokens = await this.auth.loginUser(this.email, this.password);
      console.log('Inicio de sesión exitoso:', tokens);
      this.router.navigate(['/recipe-list'],);
      // Redirigir al usuario a otra página o guardar tokens en el almacenamiento local
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage ='Ocurrió un error al iniciar sesión.', error;
    }
  }
  onBack() {
    this.router.navigate(['/home']); 
  }
  ngOnInit() {
  }

}
