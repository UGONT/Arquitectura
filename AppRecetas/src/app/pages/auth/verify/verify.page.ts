import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthentificatorService } from 'src/app/services/authentificator.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  username: string = '';
  verificationCode: string = '';

  constructor(
    private auth: AuthentificatorService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {}

  async onConfirmSignUp() {
    try {
      const result = await this.auth.confirmSignUp(this.username, this.verificationCode);

      // Mostrar toast de éxito
      await this.presentToast('Registro confirmado correctamente', 'success');
      console.log('Resultado:', result);

      // Redirigir a la página de login
      this.router.navigate(['/login']);
    } catch (error) {
      // Mostrar toast de error
      await this.presentToast('Ocurrió un error al confirmar el registro', 'danger');
      console.error('Error:', error);
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
}
