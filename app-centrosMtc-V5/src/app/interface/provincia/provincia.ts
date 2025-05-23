import { Departamento } from './../departamento/departamento';
export interface Provincia {
    id: string
    nombre: string
    departamento_id : string
    departamento_nombre?: string
}
