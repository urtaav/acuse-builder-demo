import { Type } from "@angular/core";

export interface Acuse {
  id: string;
  nombre: string;
  idOrganoGarante:number;
  secciones: Seccion[];
}

export interface Seccion {
  id: string;
  dsNombre: string;
  dsTitulo: string;
  fgVisible: number;
  qtPosicion: number;
  qtTipo: number;
  type:string;
  estilo: Estilo;
  registros: Registro[];
  component: Type<unknown>;
}

export interface Estilo {
  idEstilo: number | null;
  dsColor: string;
  dsFuente: string;
  dsNombre: string;
  qtAlineacionH: number;
  qtNegrita: number;
  qtTamanio: number;
}

export interface Columna {
  id: string;
  qtPosicion: number;
  dsValor: string;
  estilo: Estilo;

}

export interface Registro {
  id: string;
  fgVisible: number;
  qtPosicion: number;
  columnas: Columna[];
}