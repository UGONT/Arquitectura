import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificatorService } from 'src/app/services/authentificator.service';
import { ToastController } from '@ionic/angular';

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
    private auth: AuthentificatorService,
    private toastController: ToastController
  ) { }

  async login() {
    try {
      const tokens = await this.auth.loginUser(this.email, this.password);
      console.log('Inicio de sesión exitoso:', tokens);

      // Mostrar el toast de ingreso exitoso
      await this.presentToast('Ingreso exitoso', 'success');

      this.router.navigate(['/recipe-list']);
      // Redirigir al usuario a otra página o guardar tokens en el almacenamiento local
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = 'Ocurrió un error al iniciar sesión.';

      // Mostrar el toast de error en caso de fallo
      await this.presentToast(this.errorMessage, 'danger');
    }
  }

  // Método para mostrar el toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duración en milisegundos
      color,
      position: 'top', // Posición del toast
    });
    await toast.present();
  }

  onBack() {
    this.router.navigate(['/home']); 
  }

  ngOnInit() {
  }
}
