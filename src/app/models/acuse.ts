import { Type } from "@angular/core";

export interface Acuse {
  id:  string | number;
  nombre: string;
  idOrganoGarante:number;
  secciones: Seccion[];
}

export interface Seccion {
  id:  string | number;
  dsNombre: string 
  dsTitulo: string | null;
  fgVisible: number;
  qtPosicion: number;
  qtTipo: number;
  type:string;
  estilo: Estilo;
  registros: Registro[];
  component?: Type<unknown>;
}

export interface Estilo {
  id: string | number | null;
  dsColor: string;
  dsFuente: string;
  dsNombre: string;
  qtAlineacionH: number;
  qtNegrita: number;
  qtTamanio: number;
}

export interface Columna {
  id: string | number;
  qtPosicion: number;
  dsValor: string;
  estilo: Estilo;

}

export interface Registro {
  id:  string | number;
  fgVisible: number;
  qtPosicion: number;
  columnas: Columna[];
}