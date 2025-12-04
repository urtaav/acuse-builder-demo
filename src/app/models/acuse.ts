import { Type } from "@angular/core";

export interface AcuseBuilder {
  id: number | null;
  idOrganoGarante: number;
  logoIzquierdo: Logo | null;
  logoDerecho: Logo | null;
  datosUser: any;
  estadoAnteriorJSON: string | null;
  idTipoSolicitud: number;
  acuseEncabezado: Encabezado;
}

export interface Encabezado {
  dsFecha: string;
  dsSubtitulo:string;
  dsTituloPrincipal: string;
  dsTituloSecundario: string | null;
  dsLogoDerecho?: string | null;        // base64 string para el backend
  dsLogoIzquierdo?: string | null;
  acuses: Acuse[];
}
interface Logo {
  base64: string;
  filename: string;
  filetype: string;
  filesize: number;
}

export interface Acuse {
  id:  string | number;
  nombre: string;
  idOrganoGarante:number;
  idEntidadFederativa:number;
  tipoSolicitud:number;
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