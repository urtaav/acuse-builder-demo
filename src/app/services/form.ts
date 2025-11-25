import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Acuse, AcuseBuilder, Columna, Encabezado, Estilo, Registro, Seccion } from '../models/acuse';
import { SectionUno } from '../components/section-types/section-uno';
import { SectionDos } from '../components/section-types/section-dos';
import { SectionTres } from '../components/section-types/section-tres';
@Injectable({
  providedIn: 'root',
})
export class Form {

  // === Signals ===
  private _acuses = signal<Acuse[]>([]);
  private _encabezado = signal<Encabezado>({
    dsFecha: '${fechaExpedicionAcuse}',
    dsSubtitulo: 'SUBTITULO ACUSE (IP) GARANTE',
    dsTituloPrincipal: 'ACUSE ACCESO A LA INFORMACIÓN',
    dsTituloSecundario: null,
    sisaiTwAcuses: [],
  });

  private _acuseBuilder = signal<AcuseBuilder>({
    idAcuse: 0,
    logoDerecho: null,
    logoIzquierdo: null,
    datosUser: null,              // viene después de login
    estadoAnteriorJSON: null,
    idOrganoGarante: 37,
    idEntidadFederativa: 34,
    nombre: '',
    idTipoSolicitud: 1,
    acuseEncabezado: {} as Encabezado
  });

  private _datosUser = signal<any | null>(null);

  // === Exposed readonly ===
  public readonly acuses = this._acuses.asReadonly();
  public readonly encabezado = this._encabezado.asReadonly();
  public readonly acuseBuilder = this._acuseBuilder.asReadonly();
  public readonly datosUser = this._datosUser.asReadonly();

  constructor() {

    // === 1. Inicializar acuses con uno por defecto ===
    this._acuses.set([
      {
        id: 1406,
        nombre: "Solicitud Acceso a la Información",
        idOrganoGarante: 37,
        idEntidadFederativa: 34,
        tipoSolicitud: 1,
        sisaiTwAcuseSeccions: []
      }
    ]);

    // === 2. Map inicial de secciones (si hubiera) ===
    this._acuses.update(acuses =>
      acuses.map(acuse => ({
        ...acuse,
        sisaiTwAcuseSeccions: this.mapsisaiTwAcuseSeccionsDesdeBD(
          acuse.sisaiTwAcuseSeccions
        )
      }))
    );
  }


  optionsVariables = signal<any[]>([
    {
      "idAcuseVariables": 53,
      "dsMascara": "Ámbito Educativo",
      "dsVariable": "${datosAdicionales.ambitoEducativo}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 54,
      "dsMascara": "Ámbito Empresarial",
      "dsVariable": "${datosAdicionales.ambitoEmpresarial}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 55,
      "dsMascara": "Ámbito Gubernamental",
      "dsVariable": "${datosAdicionales.ambitoEmpresarial}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 56,
      "dsMascara": "Ámbito Medios Comunicación",
      "dsVariable": "${datosAdicionales.ambitoMediosComunicacion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 57,
      "dsMascara": "Ámbito Organizaciones Sociedad Civil",
      "dsVariable": "${datosAdicionales.ambitoOrganizacionesSociedadCivil}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 71,
      "dsMascara": "Asistencia para personas con discapacidad",
      "dsVariable": "${datosAdicionales.asistencias}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 7,
      "dsMascara": "Calle",
      "dsVariable": "${domicilio.calle}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 13,
      "dsMascara": "Codigo Postal",
      "dsVariable": "${domicilio.codigoPostal}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 10,
      "dsMascara": "Colonia",
      "dsVariable": "${domicilio.colonia}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 34,
      "dsMascara": "Datos adicionales",
      "dsVariable": "${solicitud.otrosDatos}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 68,
      "dsMascara": "Denominación o Razón Social",
      "dsVariable": "${solicitante.denominacionRazonSocial}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 22,
      "dsMascara": "Derecho Acceso",
      "dsVariable": "${datosAdicionales.derechoAcceso}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 45,
      "dsMascara": "Descripción complementaria de la respuesta",
      "dsVariable": "${datosRespuesta.respuestaComplementaria}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 44,
      "dsMascara": "Descripción de la respuesta",
      "dsVariable": "${datosRespuesta.respuesta}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 69,
      "dsMascara": "Documento Adjunto de la Solicitud",
      "dsVariable": "${solicitud.documentoAdjunto}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 61,
      "dsMascara": "Documento(s) Adjunto(s) de la Respuesta",
      "dsVariable": "${datosRespuesta.documentosAdjuntos}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 5,
      "dsMascara": "Domicilio",
      "dsVariable": "${solicitante.domicilio}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 15,
      "dsMascara": "E-mail",
      "dsVariable": "${domicilio.correoElectronico}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 11,
      "dsMascara": "Entidad",
      "dsVariable": "${domicilio.entidad}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 25,
      "dsMascara": "Entidad indígena",
      "dsVariable": "${datosAdicionales.entidad}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 39,
      "dsMascara": "Excentar pago descripción",
      "dsVariable": "${solicitud.dsExcentarPago}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 17,
      "dsMascara": "Fecha de nacimiento",
      "dsVariable": "${datosAdicionales.fechaNacimiento}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 64,
      "dsMascara": "Fecha de Respuesta",
      "dsVariable": "${datosRespuesta.fechaRespuesta}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 36,
      "dsMascara": "Fecha final de plazo",
      "dsVariable": "${plazos.fecha}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 41,
      "dsMascara": "Fecha Limite Respuesta",
      "dsVariable": "${solicitud.fechaLimiteRespuesta}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 62,
      "dsMascara": "Fecha Oficial Recepción",
      "dsVariable": "${solicitud.fechaOficialRecepcion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 65,
      "dsMascara": "Fecha Real Recepción",
      "dsVariable": "${solicitud.fechaRealRecepcion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 35,
      "dsMascara": "Fecha solicitud",
      "dsVariable": "${solicitud.fechaSolicitud}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 37,
      "dsMascara": "Folio",
      "dsVariable": "${noFolio}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 60,
      "dsMascara": "Folio Interno CAS",
      "dsVariable": "${noFolioInternoCAS}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 72,
      "dsMascara": "Folio origen de la canalización",
      "dsVariable": "${solicitud.folioOrigenCanalizacion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 73,
      "dsMascara": "Folios generados por canalización",
      "dsVariable": "${solicitud.foliosGeneradosPorCanalizacion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 28,
      "dsMascara": "Formato Acceso",
      "dsVariable": "${datosAdicionales.formatoAcceso}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 42,
      "dsMascara": "Fundamento Legal",
      "dsVariable": "${datosRespuesta.fundamentoLegal}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 59,
      "dsMascara": "Hash de Auntenticidad",
      "dsVariable": "${autenticidad.informacion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 33,
      "dsMascara": "Información solicitada",
      "dsVariable": "${solicitud.descripcion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 49,
      "dsMascara": "¿La información se enviara a domicilio?",
      "dsVariable": "${datosRespuesta.recogerPersonalmenteDomicilio}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 50,
      "dsMascara": "¿La solicitud fue canalizada?",
      "dsVariable": "${datosRespuesta.confirmacionCanalizacion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 24,
      "dsMascara": "Lengua o localidad indígena",
      "dsVariable": "${datosAdicionales.lenguaIndigena}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 46,
      "dsMascara": "Leyenda informativa",
      "dsVariable": "${datosRespuesta.leyendaInformativa}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 52,
      "dsMascara": "Lista de instituciones",
      "dsVariable": "${datosRespuesta.listaSO}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 51,
      "dsMascara": "Lista de leyes",
      "dsVariable": "${datosRespuesta.listaLeyes}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 27,
      "dsMascara": "Medio recepción",
      "dsVariable": "${datosAdicionales.medioRecepcion}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 32,
      "dsMascara": "Modalidad Entrega",
      "dsVariable": "${solicitud.modalidadEntrega}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 12,
      "dsMascara": "Municipio",
      "dsVariable": "${domicilio.municipio}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 26,
      "dsMascara": "Municipio indígena",
      "dsVariable": "${datosAdicionales.municipio}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 30,
      "dsMascara": "Nacionalidad",
      "dsVariable": "${datosAdicionales.nacionalidad}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 8,
      "dsMascara": "No. Exterior",
      "dsVariable": "${domicilio.noExterior}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 9,
      "dsMascara": "No. Interior",
      "dsVariable": "${domicilio.noInterior}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 2,
      "dsMascara": "Nombre",
      "dsVariable": "${solicitante.nombre}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 40,
      "dsMascara": "Nombre archivo acuse",
      "dsVariable": "${solicitud.nombreAcuse}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 1,
      "dsMascara": "Nombre completo",
      "dsVariable": "${solicitante.nombreCompleto}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 6,
      "dsMascara": "Nombre completo del representante",
      "dsVariable": "${solicitante.representante}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 43,
      "dsMascara": "Número de Preguntas",
      "dsVariable": "${datosRespuesta.numeroDePreguntas}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 58,
      "dsMascara": "Otro Ámbito",
      "dsVariable": "${datosAdicionales.otroAmbito}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 23,
      "dsMascara": "Otro derecho acceso",
      "dsVariable": "${datosAdicionales.otroDerechoAcceso}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 66,
      "dsMascara": "País",
      "dsVariable": "${solicitud.pais}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 47,
      "dsMascara": "Periodo de reserva",
      "dsVariable": "${datosRespuesta.periodoReserva}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 3,
      "dsMascara": "Primer apellido",
      "dsVariable": "${solicitante.primerApellido}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 29,
      "dsMascara": "Pueblo Indígena",
      "dsVariable": "${datosAdicionales.puebloIndigena}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 4,
      "dsMascara": "Segundo apellido",
      "dsVariable": "${solicitante.segundoApellido}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 16,
      "dsMascara": "Sexo",
      "dsVariable": "${datosAdicionales.sexo}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 31,
      "dsMascara": "Sujeto Obligado",
      "dsVariable": "${solicitud.dependenciaEntidad}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 14,
      "dsMascara": "Teléfono",
      "dsVariable": "${domicilio.telefono}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 67,
      "dsMascara": "Tipo Derecho",
      "dsVariable": "${solicitud.tipoDerecho}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 63,
      "dsMascara": "Tipo Solicitud",
      "dsVariable": "${solicitud.tipoSolicitud}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 48,
      "dsMascara": "Titúlo de la respuesta",
      "dsVariable": "${datosRespuesta.tituloRespuesta}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 38,
      "dsMascara": "Usuario CAS",
      "dsVariable": "${usuarioPNT}",
      "qtTipoSeccion": null
    },
    {
      "idAcuseVariables": 70,
      "dsMascara": "Usuario Login",
      "dsVariable": "${usuarioLogin}",
      "qtTipoSeccion": null
    }
  ]);


  acuse(nombre = "Acuse nuevo") {
    return;
  }
  // crear sisaiTwAcuseSeccions similares a tus create_seccion_*
  addSeccionUnaColumna(acuseId: string | number) {
    this.addSeccion(acuseId, 1, 'Sección de una columna', 1);
  }

  addSeccionDosColumnas(acuseId: string | number) {
    this.addSeccion(acuseId, 2, 'Sección de dos columnas', 2);
  }

  addSeccionTresColumnas(acuseId: string | number) {
    this.addSeccion(acuseId, 3, 'Sección de tres columnas', 3);
  }

  private addSeccion(acuseId: string | number, tipo: number, nombre: string, columnasPorRegistro: number) {

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
      sisaiTwAcuseEstilo: this.baseEstilo(tipo),
      sisaiTwAcuseRegistros: [this.createRegistro(columnasPorRegistro)]
    };
    this._acuses.update(acuses => acuses.map(a => a.id === acuseId ? { ...a, sisaiTwAcuseSeccions: [...a.sisaiTwAcuseSeccions, seccion] } : a));
  }

  private createRegistro(numCols: number): Registro {
    return {
      id: crypto.randomUUID(),
      fgVisible: 1,
      qtPosicion: 1,
      sisaiTwAcuseColumnas: Array.from({ length: numCols }).map((_, i) => this.createColumna(i + 1))
    };
  }

  private createColumna(pos: number): Columna {
    return {
      id: crypto.randomUUID(),
      qtPosicion: pos,
      dsValor: '',
      sisaiTwAcuseEstilo: this.baseEstilo('col'),
    };
  }

  private baseEstilo(nameOrType: any): Estilo {
    return {
      id: null,
      dsColor: '#000000',
      dsFuente: 'Arial',
      dsNombre: 'estiloNormal',
      qtAlineacionH: 1,
      qtNegrita: 0,
      qtTamanio: 12,
    };
  }

  private nextPosicionSeccion(acuseId: string | number) {
    const acuse = this._acuses().find(a => a.id === acuseId);
    return (acuse?.sisaiTwAcuseSeccions.length ?? 0) + 1;
  }
  private _selectedSectionId = signal<string | null | number>(null);

  setSelectedSection(fieldId: string | null | number) {
    this._selectedSectionId.set(fieldId);
  }

  public readonly selectedSection = computed(() => {

    return this._acuses()
      .flatMap((row) => row.sisaiTwAcuseSeccions)
      .find((f) => f.id === this._selectedSectionId())
  })

  updateColumna(columnaId: string | number, valor: string) {
    const acuse = this._acuses(); // <-- tu signal principal

    const newAcuse = acuse.map(a => ({
      ...a,
      sisaiTwAcuseSeccions: a.sisaiTwAcuseSeccions.map(seccion => ({
        ...seccion,
        sisaiTwAcuseRegistros: seccion.sisaiTwAcuseRegistros.map(reg => ({
          ...reg,
          sisaiTwAcuseColumnas: reg.sisaiTwAcuseColumnas.map(col =>
            col.id === columnaId
              ? { ...col, dsValor: valor }   // <-- aquí actualizas
              : col
          )
        }))
      }))
    }));

    this._acuses.set(newAcuse);
  }

  updateSeccion(seccionId: string | number, valor: string) {
    const acuse = this._acuses(); // <-- tu signal principal

    const newAcuse = acuse.map(a => ({
      ...a,
      sisaiTwAcuseSeccions: a.sisaiTwAcuseSeccions.map(seccion =>
        seccion.id === seccionId ? { ...seccion, dsTitulo: valor } : seccion
      )
    }));

    this._acuses.set(newAcuse);
  }

  addColumnaToSeccion(seccionId: string | number, seccionType: string) {
    const acuse = this._acuses();

    // Dependiendo del tipo, cuántas columnas agregar
    const columnasPorAgregar =
      seccionType === "seccion2" ? 2 :
        seccionType === "seccion3" ? 3 : 0;

    const newAcuse = acuse.map(a => ({
      ...a,
      sisaiTwAcuseSeccions: a.sisaiTwAcuseSeccions.map(seccion => {

        if (seccion.id !== seccionId) return seccion;
        if (columnasPorAgregar === 0) return seccion;

        const currentCols = seccion.sisaiTwAcuseRegistros[0].sisaiTwAcuseColumnas.length;

        // ⬇ Generar N columnas nuevas
        const nuevasColumnas = Array.from({ length: columnasPorAgregar }, (_, i) =>
          this.createColumna(currentCols + i + 1)
        );

        return {
          ...seccion,
          sisaiTwAcuseRegistros: seccion.sisaiTwAcuseRegistros.map(reg => ({
            ...reg,
            sisaiTwAcuseColumnas: [...reg.sisaiTwAcuseColumnas, ...nuevasColumnas] // ⬅ Agregar lote completo
          }))
        };
      })
    }));

    this._acuses.set(newAcuse);
  }


  addRegistroToSeccion(seccionId: string | number, seccionType: string) {
    const acuse = this._acuses();

    // Cantidad de columnas por tipo
    const columnasPorRegistro =
      seccionType === "seccion2" ? 2 :
        seccionType === "seccion3" ? 3 : 0;

    if (columnasPorRegistro === 0) return;

    const newAcuse = acuse.map(a => ({
      ...a,
      sisaiTwAcuseSeccions: a.sisaiTwAcuseSeccions.map(seccion => {

        if (seccion.id !== seccionId) return seccion;

        // Crear el nuevo registro usando tu constructor oficial
        const nuevoRegistro: Registro = this.createRegistro(columnasPorRegistro);

        return {
          ...seccion,
          sisaiTwAcuseRegistros: [
            ...seccion.sisaiTwAcuseRegistros,
            nuevoRegistro
          ]
        } satisfies Seccion;
      })
    }));

    this._acuses.set(newAcuse);
  }
  updateColumnaStyle(columnaId: string | number, field: keyof Estilo, value: any) {
    const acuses = this._acuses();

    const newAcuses = acuses.map(acuse => ({
      ...acuse,
      sisaiTwAcuseSeccions: acuse.sisaiTwAcuseSeccions.map(seccion => ({
        ...seccion,
        sisaiTwAcuseRegistros: seccion.sisaiTwAcuseRegistros.map(registro => ({
          ...registro,
          sisaiTwAcuseColumnas: registro.sisaiTwAcuseColumnas.map(columna =>
            columna.id === columnaId
              ? {
                ...columna,
                sisaiTwAcuseEstilo: {
                  ...columna.sisaiTwAcuseEstilo,
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

  updateSectionsOrder(rowId: string | number, newOrder: Seccion[]) {
    const current = this.acuses(); // signal
    const updated = current.map(r =>
      r.id === rowId
        ? { ...r, sisaiTwAcuseSeccions: [...newOrder] }
        : r
    );

    this._acuses.set(updated);
  }

  insertSeccionAt(acuseId: string, seccion: Seccion, index: number) {
    this._acuses.update(acuses =>
      acuses.map(a => {
        if (a.id !== acuseId) return a;

        const newList = [...a.sisaiTwAcuseSeccions];
        newList.splice(index, 0, seccion);

        // recalcular posiciones
        const updated = newList.map((s, i) => ({ ...s, qtPosicion: i + 1 }));

        return { ...a, sisaiTwAcuseSeccions: updated };
      })
    );
  }

  deleteSection(sectionId: string | number) {
    this._acuses.update(acuses =>
      acuses.map(acuse => ({
        ...acuse,
        sisaiTwAcuseSeccions: acuse.sisaiTwAcuseSeccions.filter(s => s.id !== sectionId)
      }))
    );

    // si la sección deletada era la seleccionada, limpiar selección
    if (this.selectedSection()?.id === sectionId) {
      this.setSelectedSection(null);
    }
  }

  converterMaskBeforShowInUI(value:string) {
    return this.helper_replace_mask_jasper_to_mask(value, this.optionsVariables());
  }
  private mapsisaiTwAcuseSeccionsDesdeBD(sisaiTwAcuseSeccions: Seccion[]): any[] {
    return sisaiTwAcuseSeccions.map(seccion => {

      // aplica solo a sisaiTwAcuseSeccions con contenido editable (si aplica)
      if (seccion.qtTipo === 1 || seccion.qtTipo === 2 && seccion.sisaiTwAcuseRegistros) {

        seccion.sisaiTwAcuseRegistros.forEach((registro: Registro) => {

          registro.sisaiTwAcuseColumnas.forEach(col => {

            if (col.dsValor) {
              col.dsValor = this.helper_replace_mask_jasper_to_mask(
                col.dsValor,
                this.optionsVariables()
              );
            }

          });
        });
      }

      return seccion;
    });
  }
  
 prepararsisaiTwAcuseSeccionsParaGuardar(sisaiTwAcuseSeccions: any[]): any[] {
    return sisaiTwAcuseSeccions.map(seccion => {

      if (seccion.qtTipo === 1 && seccion.sisaiTwAcuseRegistros) {

        seccion.sisaiTwAcuseRegistros.forEach((registro: Registro) => {

          registro.sisaiTwAcuseColumnas.forEach(col => {

            if (col.dsValor) {
              col.dsValor = this.helper_replace_mask_to_mask_jasper(
                col.dsValor,
                this.optionsVariables()
              );
            }

          });
        });
      }

      return seccion;
    });
  }

  private helper_replace_mask_jasper_to_mask(value: string, variables: any[]): string {
    if (!value) return "";

    // Regex que detecta ${loQueSea}
    return value.replace(/\$\{([^}]+)\}/g, (_, variableCompleta) => {
      const item = variables.find(v => v.dsVariable === `\${${variableCompleta}}`);
      const mascara = item ? item.dsMascara : variableCompleta;
      return `<${mascara}>`;
    });
  }

  private helper_replace_mask_to_mask_jasper(value: string, variables: any[]): string {
    if (!value) return "";

    // Regex que detecta <loQueSea>
    return value.replace(/<([^>]+)>/g, (_, mascara) => {
      const item = variables.find(v => v.dsMascara === mascara);
      return item ? item.dsVariable : mascara;
    });
  }

  updateAcuseBuilder(data: Partial<AcuseBuilder>) {
      console.log('Updating updateAcuseBuilder:', data);
    this._acuseBuilder.update(ab => ({
      ...ab,
      ...data
    }));
  }
  updateEncabezado(data: Partial<Encabezado>) {
      console.log('Updating updateEncabezado:', data);
    this._acuseBuilder.update(e => ({
      ...e!,
      acuseEncabezado: {
        ...e.acuseEncabezado,
        ...data
      }
    }));
  }
}