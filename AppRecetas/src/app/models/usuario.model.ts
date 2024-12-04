export class Usuario {
    constructor(
      public idUsuario: number,
      public nombre: string,
      public correo: string,
      public contrasena: string
    ) {}
  
    /**
     * Convierte un objeto JSON en una instancia de Usuario.
     * @param data Objeto JSON con los datos del usuario.
     * @returns Instancia de Usuario.
     */
    static fromJSON(data: any): Usuario {
      return new Usuario(
        data.idUsuario,
        data.nombre,
        data.correo,
        data.contrasena
      );
    }
  
    /* 
     Convierte la instancia de Usuario a un objeto JSON.
     */
    toJSON(): any {
      return {
        idUsuario: this.idUsuario,
        nombre: this.nombre,
        correo: this.correo,
        contrasena: this.contrasena
      };
    }
  }
  