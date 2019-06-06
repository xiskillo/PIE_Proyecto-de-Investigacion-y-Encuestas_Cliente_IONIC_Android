export class RegistrosQR{

    public codificado: string;
    public descodificado: string;
    public fecha_creacion: Date;


    constructor( codificado: string, descodificado: string){

        this.codificado = codificado;
        this.descodificado = descodificado;
        this.fecha_creacion = new Date();
    }
}