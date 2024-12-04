export class Receta {
    constructor(
        public idReceta: number,
        public titulo: string,
        public descripcion: string,
        public ingredientes: string[],
        public pasos: string[],
        public autor: number,
        public fechaCreacion: string
    ) { }

    /**
     * Convierte un objeto JSON en una instancia de Receta.
     * @param data Objeto JSON con los datos de la receta.
     * @returns Instancia de Receta.
     */
    static fromJSON(data: any): Receta {
        return new Receta(
            data.idReceta,
            data.titulo,
            data.descripcion,
            data.ingredientes,
            data.pasos,
            data.autor,
            data.fechaCreacion
        );
    }

    /*
     Convierte la instancia de Receta a un objeto JSON.
     */
    toJSON(): any {
        return {
            idReceta: this.idReceta,
            titulo: this.titulo,
            descripcion: this.descripcion,
            ingredientes: this.ingredientes,
            pasos: this.pasos,
            autor: this.autor,
            fechaCreacion: this.fechaCreacion
        };
    }
}
