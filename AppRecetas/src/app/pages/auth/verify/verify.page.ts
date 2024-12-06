import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private router : Router
  ) { }

  ngOnInit() {
  }

  async onConfirmSignUp() {
    try {
      const result = await this.auth.confirmSignUp(this.username, this.verificationCode);
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Registro confirmado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
      console.log('Resultado:', result);
      this.router.navigate(["/login"])
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ocurrió un error al confirmar el registro.',
        buttons: ['OK'],
      });
      await alert.present();
      console.error('Error:', error);
    }
  }

}
