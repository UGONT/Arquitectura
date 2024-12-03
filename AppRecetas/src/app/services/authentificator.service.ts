import { Injectable } from '@angular/core';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import userPool from '../../cognito-config';



@Injectable({
  providedIn: 'root'
})
export class AuthentificatorService {

  private userPool: AmazonCognitoIdentity.CognitoUserPool;

  constructor() {
    const poolData = {
      UserPoolId: 'us-east-1_WYl5dOv4G',    // Reemplaza con tu User Pool ID
      ClientId: 'tcqi4ggelumhubpe0stf24s2a'    // Reemplaza con tu App Client ID
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
        Name: 'nickname', // Atributo 'nickname' requerido
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

  // Iniciar sesión
  signIn(username: string, password: string): Promise<any> {
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
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
    const cognitoUser = this.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }


}
