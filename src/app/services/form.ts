import { computed, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';
import { Acuse, Columna, Estilo, Registro, Seccion } from '../models/acuse';
import { SectionUno } from '../components/section-types/section-uno';
import { SectionDos } from '../components/section-types/section-dos';
import { SectionTres } from '../components/section-types/section-tres';
@Injectable({
  providedIn: 'root',
})
export class Form {
  private _acuses = signal<Acuse[]>([]);
  public readonly acuses = this._acuses.asReadonly();

  constructor() {

    // seed: crea un acuse por defecto
    const id = 'acuseId0001';
    this._acuses.set([{
      id,
      idOrganoGarante: 33,
      nombre: 'Solicitud Acceso a la Información',
      secciones: []
    }]);
  }



  acuse(nombre = "Acuse nuevo") {
    return;
  }
  // crear secciones similares a tus create_seccion_*
  addSeccionUnaColumna(acuseId: string) {
    this.addSeccion(acuseId, 1, 'Sección de una columna', 1);
  }

  addSeccionDosColumnas(acuseId: string) {
    this.addSeccion(acuseId, 2, 'Sección de dos columnas', 2);
  }

  addSeccionTresColumnas(acuseId: string) {
    this.addSeccion(acuseId, 3, 'Sección de tres columnas', 3);
  }

  private addSeccion(acuseId: string, tipo: number, nombre: string, columnasPorRegistro: number) {

    let type: string = '';
    let component = null;
    switch (tipo) {
      case 1:
        type = 'seccion1'
        component = SectionUno
        break;
      case 2:
        type = 'seccion2'
        component = SectionDos
        break;
      case 3:
        type = 'seccion3'
        component = SectionTres
        break;

      default:
        type = 'seccion1'
        component = SectionUno
        break;
    }
    const seccion: Seccion = {
      id: crypto.randomUUID(),
      dsNombre: nombre,
      dsTitulo: '',
      fgVisible: 1,
      qtPosicion: this.nextPosicionSeccion(acuseId),
      qtTipo: tipo,
      type,
      component,
      estilo: this.baseEstilo(tipo),
      registros: [this.createRegistro(columnasPorRegistro)]
    };
    this._acuses.update(acuses => acuses.map(a => a.id === acuseId ? { ...a, secciones: [...a.secciones, seccion] } : a));
  }

  private createRegistro(numCols: number): Registro {
    return {
      id: crypto.randomUUID(),
      fgVisible: 1,
      qtPosicion: 1,
      columnas: Array.from({ length: numCols }).map((_, i) => this.createColumna(i + 1))
    };
  }

  private createColumna(pos: number): Columna {
    return {
      id: crypto.randomUUID(),
      qtPosicion: pos,
      dsValor: '',
      estilo: this.baseEstilo('col'),
    };
  }

  private baseEstilo(nameOrType: any): Estilo {
    return {
      idEstilo: null,
      dsColor: '#000000',
      dsFuente: 'Arial',
      dsNombre:  'estiloNormal',
      qtAlineacionH: 1,
      qtNegrita: 0,
      qtTamanio: 12,
    };
  }

  private nextPosicionSeccion(acuseId: string) {
    const acuse = this._acuses().find(a => a.id === acuseId);
    return (acuse?.secciones.length ?? 0) + 1;
  }
  private _selectedSectionId = signal<string | null>(null);

  setSelectedSection(fieldId: string) {
    this._selectedSectionId.set(fieldId);
  }

  public readonly selectedSection = computed(() => {

    return this._acuses()
      .flatMap((row) => row.secciones)
      .find((f) => f.id === this._selectedSectionId())
  })

  updateColumna(columnaId: string, valor: string) {
    const acuse = this._acuses(); // <-- tu signal principal

    const newAcuse = acuse.map(a => ({
      ...a,
      secciones: a.secciones.map(seccion => ({
        ...seccion,
        registros: seccion.registros.map(reg => ({
          ...reg,
          columnas: reg.columnas.map(col =>
            col.id === columnaId
              ? { ...col, dsValor: valor }   // <-- aquí actualizas
              : col
          )
        }))
      }))
    }));

    this._acuses.set(newAcuse);
  }

  updateSeccion(seccionId: string, valor: string) {
    const acuse = this._acuses(); // <-- tu signal principal

    const newAcuse = acuse.map(a => ({
      ...a,
      secciones: a.secciones.map(seccion =>
        seccion.id === seccionId ? { ...seccion, dsTitulo: valor } : seccion
      )
    }));

    this._acuses.set(newAcuse);
  }

  addColumnaToSeccion(seccionId: string, seccionType: string) {
  const acuse = this._acuses();

  // Dependiendo del tipo, cuántas columnas agregar
  const columnasPorAgregar =
    seccionType === "seccion2" ? 2 :
    seccionType === "seccion3" ? 3 : 0;

  const newAcuse = acuse.map(a => ({
    ...a,
    secciones: a.secciones.map(seccion => {

      if (seccion.id !== seccionId) return seccion;
      if (columnasPorAgregar === 0) return seccion;

      const currentCols = seccion.registros[0].columnas.length;

      // ⬇ Generar N columnas nuevas
      const nuevasColumnas = Array.from({ length: columnasPorAgregar }, (_, i) =>
        this.createColumna(currentCols + i + 1)
      );

      return {
        ...seccion,
        registros: seccion.registros.map(reg => ({
          ...reg,
          columnas: [...reg.columnas, ...nuevasColumnas] // ⬅ Agregar lote completo
        }))
      };
    })
  }));

  this._acuses.set(newAcuse);
}


addRegistroToSeccion(seccionId: string, seccionType: string) {
  const acuse = this._acuses();

  // Cantidad de columnas por tipo
  const columnasPorRegistro =
    seccionType === "seccion2" ? 2 :
    seccionType === "seccion3" ? 3 : 0;

  if (columnasPorRegistro === 0) return;

  const newAcuse = acuse.map(a => ({
    ...a,
    secciones: a.secciones.map(seccion => {

      if (seccion.id !== seccionId) return seccion;

      // Crear el nuevo registro usando tu constructor oficial
      const nuevoRegistro: Registro = this.createRegistro(columnasPorRegistro);

      return {
        ...seccion,                   // 🔥 Mantenemos todas las propiedades obligatorias
        registros: [
          ...seccion.registros,
          nuevoRegistro               // 🔥 Agregamos el registro nuevo
        ]
      } satisfies Seccion;            // 🔥 Garantiza tipado exacto
    })
  }));

  this._acuses.set(newAcuse);
}
updateColumnaStyle(columnaId: string, field: keyof Estilo, value: any) {
  const acuses = this._acuses();

  const newAcuses = acuses.map(acuse => ({
    ...acuse,
    secciones: acuse.secciones.map(seccion => ({
      ...seccion,
      registros: seccion.registros.map(registro => ({
        ...registro,
        columnas: registro.columnas.map(columna =>
          columna.id === columnaId
            ? {
                ...columna,
                estilo: {
                  ...columna.estilo,
                  [field]: value
                }
              }
            : columna
        )
      }))
    }))
  }));

  this._acuses.set(newAcuses);
}



}