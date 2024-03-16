export interface Audio {
    data(data: any): unknown;
    id:number;
    titulo:string;
    autor:string;
    comentarios: string;
    ruta_audio:string;
    ruta_imagen:string;
    latitud:string;
    longitud:string;
    canton:string;
    provincia:string;
    fecha_registro:string;
}