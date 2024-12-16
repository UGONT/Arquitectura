import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificatorService } from 'src/app/services/authentificator.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  

  username: string = '';
  password: string = '';
  email: string = '';
  formularioRegistro: FormGroup;

  user: string = '';
  verificationCode: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthentificatorService,
    private toastController: ToastController
  ) {

    this.formularioRegistro = this.fb.group({

      usuario: new FormControl('', [
        Validators.required,
      ]),
      correo: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      confirmacionPassword: new FormControl('', Validators.required)

    }, { validators: this.passwordIguales });
  }

  passwordIguales(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmarPassword = group.get('confirmacionPassword')?.value;
    return password == confirmarPassword ? null : { notMatching: true };
  }

  async onRegister() {
    // Lógica para procesar el registro
    console.log('Registrando usuario...');

    if (this.formularioRegistro.valid) {

      this.username = this.formularioRegistro.value.usuario
      this.email = this.formularioRegistro.value.correo
      this.password = this.formularioRegistro.value.password

      this.auth.signUp(this.username, this.password, this.email)
      .then(async (result) => {
        console.log('Registration success:', result);

        // Mostrar toast de registro exitoso
        await this.presentToast('Registro exitoso, por favor confirma tu cuenta', 'success');

        this.router.navigate(["/verify"]);
      })
      .catch((err) => {
        console.error('Registration error:', err);

        // Mostrar toast de error en caso de fallo
        this.presentToast('Ocurrió un error al registrar el usuario', 'danger');
      });

    } else {
      console.log("Formulario incompleto");
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
