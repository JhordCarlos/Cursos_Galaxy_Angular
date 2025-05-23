import { Departamento } from './../departamento/departamento';
export interface Centromedicorequest {
    ruc: string
    nombre: string
    direccion: string
    departamentoId : string
    provinciaId : string
    distritoId : string
    autorizacion: number
}
