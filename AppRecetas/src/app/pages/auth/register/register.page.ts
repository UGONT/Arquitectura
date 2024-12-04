import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificatorService } from 'src/app/services/authentificator.service';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthentificatorService,
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
      .then((result) => {
        console.log('Registration success:', result);
        this.router.navigate(["/login"])
      })
      .catch((err) => {
        console.error('Registration error:', err);
      });

    }
    else {
      /* MAL */
      console.log("Formulario incompleto")
    }

  } 

  onBack() {
    this.router.navigate(['/home']); 
  }

  ngOnInit() {
  }

}
