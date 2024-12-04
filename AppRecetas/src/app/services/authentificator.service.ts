import { Injectable } from '@angular/core';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import userPool from '../../cognito-config';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';


@Injectable({
  providedIn: 'root'
})
export class AuthentificatorService {

  private userPool: AmazonCognitoIdentity.CognitoUserPool;

  constructor() {
    const poolData = {
      UserPoolId: 'us-east-1_WYl5dOv4G',    
      ClientId: 'tcqi4ggelumhubpe0stf24s2a' 
    };

    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  }

  // Registrar sesion
  signUp(nickname: string, password: string, email: string): Promise<any> {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email,
        
      }),
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'nickname', 
        Value: nickname,
      }),
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(nickname, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Iniciar sesiin
  loginUser(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          const accessToken = result.getAccessToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();

          // Almacena los tokens en el almacenamiento local
          localStorage.setItem('idToken', idToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          console.log('Inicio de sesión exitoso');
          resolve();
        },
        onFailure: (err) => {
          console.error('Error de inicio de sesión:', err);
          reject(err);
        },
      });
    });
  }

  // Confirmar el código de verificación enviado por correo electrónico después del registro
  confirmSignUp(username: string, verificationCode: string): Promise<any> {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Obtener los detalles del usuario actual
  getCurrentUser(): AmazonCognitoIdentity.CognitoUser | null {
    return this.userPool.getCurrentUser();
  }

  // Cerrar sesión
  signOut() {
    try {
      localStorage.removeItem('idToken'); // Limpia los tokens del almacenamiento local
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
  
      const cognitoUser = this.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.signOut(); // Cierra la sesión en Cognito
      }
  
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  

  logoutUser() {
    localStorage.clear(); // Limpia los tokens del almacenamiento
    console.log('Sesión cerrada');
  }


}
