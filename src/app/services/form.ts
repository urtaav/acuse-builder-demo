import { computed, inject, Injectable, signal } from '@angular/core';
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
      secciones: [
        {
          "id": 12804,
          "dsNombre": "Seccion de una columna",
          "dsTitulo": null,
          "fgVisible": 1,
          "qtPosicion": 2,
          "qtTipo": 1,
          "type": "seccion1",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25439,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46207,
                  "dsValor": "FOLIO DE LA SOLICITUD: ${noFolio}  \nFECHA: ${solicitud.fechaSolicitud}  ",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21177,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 3,
                    "qtNegrita": 0,
                    "qtTamanio": 12
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12805,
          "dsNombre": "Seccion de dos columnas",
          "dsTitulo": "DATOS DEL SOLICITANTE",
          "fgVisible": 1,
          "qtPosicion": 3,
          "qtTipo": 2,
          "type": "seccion2",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25440,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46208,
                  "dsValor": "NOMBRE O RAZÓN SOCIAL:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21178,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46209,
                  "dsValor": "${solicitante.nombreCompleto}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21179,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25441,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46210,
                  "dsValor": "NOMBRE DE REPRESENTANTE LEGAL:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21178,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46211,
                  "dsValor": "${solicitante.representante}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21179,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25442,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46212,
                  "dsValor": "DOMICILIO:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21178,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46213,
                  "dsValor": "${solicitante.domicilio}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21179,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25443,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46214,
                  "dsValor": "CORREO ELECTRÓNICO",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21178,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46215,
                  "dsValor": "${usuarioLogin}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21179,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12806,
          "dsNombre": "Seccion de dos columnas",
          "dsTitulo": "DATOS DE LA SOLICITUD",
          "fgVisible": 1,
          "qtPosicion": 4,
          "qtTipo": 2,
          "type": "seccion2",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25444,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46216,
                  "dsValor": "NOMBRE DEL SUJETO OBLIGADO AL QUE DIRIGE LA SOLICITUD:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21180,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46217,
                  "dsValor": "${solicitud.dependenciaEntidad}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21181,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25445,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46218,
                  "dsValor": "INFORMACIÓN SOLICITADA:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21180,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46219,
                  "dsValor": "${solicitud.descripcion}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21181,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25446,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46220,
                  "dsValor": "DATOS ADICIONALES:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21180,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46221,
                  "dsValor": "${solicitud.otrosDatos}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21181,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25447,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46222,
                  "dsValor": "MODALIDAD DE ENTREGA:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21180,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46223,
                  "dsValor": "${solicitud.modalidadEntrega}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21181,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12807,
          "dsNombre": "Seccion de una columna",
          "dsTitulo": null,
          "fgVisible": 1,
          "qtPosicion": 5,
          "qtTipo": 1,
          "type": "seccion1",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25448,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46224,
                  "dsValor": "Para los efectos del cómputo de los plazos específicos establecidos en los artículos 132, 134, 136 y 140 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Campeche, se le informa se ha recibido su solicitud con fecha: ${solicitud.fechaOficialRecepcion}. Cabe precisar que toda solicitud presentada después de las 15:00 horas de un día hábil o en cualquier hora de un día inhábil, se tendrá por recibida al día hábil siguiente.",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21182,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 4,
                    "qtNegrita": 0,
                    "qtTamanio": 10
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12808,
          "dsNombre": "Seccion de una columna",
          "dsTitulo": null,
          "fgVisible": 1,
          "qtPosicion": 6,
          "qtTipo": 1,
          "type": "seccion1",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25449,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46225,
                  "dsValor": "Asimismo, se le comunica que, al haber enviado su solicitud por este medio electrónico, acepta que las notificaciones y resoluciones que se formulen en atención a la misma se pongan a su disposición por esta vía, la cual se obliga a consultar para dar seguimiento a su solicitud, en los plazos establecidos en la Ley mencionada.\n\nEl seguimiento a su solicitud podrá realizarlo mediante el número de folio que se indica en este acuse en la página de Internet con dirección:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21183,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 4,
                    "qtNegrita": 0,
                    "qtTamanio": 10
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12809,
          "dsNombre": "Seccion de una columna",
          "dsTitulo": null,
          "fgVisible": 1,
          "qtPosicion": 7,
          "qtTipo": 1,
          "type": "seccion1",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25450,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46226,
                  "dsValor": "www.plataformadetransparencia.org.mx",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21184,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 2,
                    "qtNegrita": 0,
                    "qtTamanio": 10
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12803,
          "dsNombre": "Seccion de una columna",
          "dsTitulo": null,
          "fgVisible": 1,
          "qtPosicion": 1,
          "qtTipo": 1,
          "type": "seccion1",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25438,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46206,
                  "dsValor": "ACUSE DE RECIBO",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21176,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 2,
                    "qtNegrita": 0,
                    "qtTamanio": 12
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12810,
          "dsNombre": "Seccion de una columna",
          "dsTitulo": null,
          "fgVisible": 1,
          "qtPosicion": 8,
          "qtTipo": 1,
          "type": "seccion1",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25451,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46227,
                  "dsValor": "En caso de que por alguna falla técnica del sistema no pudiera abrir las notificaciones y resoluciones que se pongan a su disposición en esta página, deberá de informarlo de inmediato a la Unidad Transparencia de este Sujeto Obligado, a fin de que se le notifique por otro medio.",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21185,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 4,
                    "qtNegrita": 0,
                    "qtTamanio": 10
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12811,
          "dsNombre": "Seccion de tres columnas",
          "dsTitulo": "PLAZOS DE RESPUESTAS A LAS SOLICITUDES DE INFORMACIÓN PÚBLICA",
          "fgVisible": 1,
          "qtPosicion": 9,
          "qtTipo": 3,
          "type": "seccion3",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25452,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46228,
                  "dsValor": "RESPUESTA A LA SOLICITUD, INDICANDO LA FORMA Y MEDIO EN QUE SE PONDRÁ A DISPOSICIÓN LA INFORMACIÓN, ASÍ COMO EN SU CASO EL COSTO:",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21186,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46229,
                  "dsValor": "20 días hábiles ",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21187,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                },
                {
                  "id": 46230,
                  "dsValor": "${plazos.fecha}",
                  "qtPosicion": 3,
                  "estilo": {
                    "id": 21188,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25453,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46233,
                  "dsValor": "NOTIFICACIÓN EN CASO DE QUE SE DETERMINE LA NOTORIA INCOMPETENCIA DEL SUJETO OBLIGADO, DENTRO DEL ÁMBITO MATERIAL DE SU APLICACIÓN:",
                  "qtPosicion": 3,
                  "estilo": {
                    "id": 21188,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                },
                {
                  "id": 46231,
                  "dsValor": "3 días hábiles",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21186,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46232,
                  "dsValor": "${plazos.fecha}",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21187,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25454,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46234,
                  "dsValor": "REQUERIMIENTO PARA PROPORCIONAR ELEMENTOS ADICIONALES O SUBSANAR OMISIONES, QUE PERMITAN LOCALIZAR LA INFORMACIÓN SOLICITADA (1):",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21186,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46235,
                  "dsValor": "5 días hábiles ",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21187,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                },
                {
                  "id": 46236,
                  "dsValor": "${plazos.fecha}",
                  "qtPosicion": 3,
                  "estilo": {
                    "id": 21188,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            },
            {
              "id": 25455,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46237,
                  "dsValor": "RESPUESTA A LA SOLICITUD EN CASO DE QUE HAYA RECIBIDO NOTIFICACIÓN DE AMPLICACIÓN DE PLAZO",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21186,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 9
                  }
                },
                {
                  "id": 46238,
                  "dsValor": "30 días hábiles ",
                  "qtPosicion": 2,
                  "estilo": {
                    "id": 21187,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                },
                {
                  "id": 46239,
                  "dsValor": "${plazos.fecha}",
                  "qtPosicion": 3,
                  "estilo": {
                    "id": 21188,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 1,
                    "qtNegrita": 0,
                    "qtTamanio": 8
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 12812,
          "dsNombre": "Seccion de una columna",
          "dsTitulo": null,
          "fgVisible": 1,
          "qtPosicion": 10,
          "qtTipo": 1,
          "type": "seccion1",
          "estilo": {
            "id": 21175,
            "dsColor": "#000000",
            "dsFuente": "Arial",
            "dsNombre": "estiloNegritaSeccion",
            "qtAlineacionH": 4,
            "qtNegrita": 1,
            "qtTamanio": 8
          },
          "registros": [
            {
              "id": 25456,
              "fgVisible": 1,
              "qtPosicion": 1,
              "columnas": [
                {
                  "id": 46240,
                  "dsValor": "En caso de ampliación de plazo para dar atención a la solicitud deberá notificarse antes de la conclusión del plazo establecido en el artículo 136 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Campeche.\n\n(1) Este requerimiento se le notificará a través del sistema e interrumpirá el plazo de respuesta; se deberá contestar a más tardar en 10 días hábiles. En caso de no recibirse las aclaraciones, la solicitud se tendrá como no presentada.",
                  "qtPosicion": 1,
                  "estilo": {
                    "id": 21189,
                    "dsColor": "#000000",
                    "dsFuente": "Arial",
                    "dsNombre": "estiloNormal",
                    "qtAlineacionH": 4,
                    "qtNegrita": 0,
                    "qtTamanio": 10
                  }
                }
              ]
            }
          ]
        }
      ]
    }]);

    this._acuses.update(acuses =>
      acuses.map(acuse => ({
        ...acuse,
        secciones: this.mapSeccionesDesdeBD(acuse.secciones)
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
  // crear secciones similares a tus create_seccion_*
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
    return (acuse?.secciones.length ?? 0) + 1;
  }
  private _selectedSectionId = signal<string | null | number>(null);

  setSelectedSection(fieldId: string | null | number) {
    this._selectedSectionId.set(fieldId);
  }

  public readonly selectedSection = computed(() => {

    return this._acuses()
      .flatMap((row) => row.secciones)
      .find((f) => f.id === this._selectedSectionId())
  })

  updateColumna(columnaId: string | number, valor: string) {
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

  updateSeccion(seccionId: string | number, valor: string) {
    const acuse = this._acuses(); // <-- tu signal principal

    const newAcuse = acuse.map(a => ({
      ...a,
      secciones: a.secciones.map(seccion =>
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


  addRegistroToSeccion(seccionId: string | number, seccionType: string) {
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
          ...seccion,
          registros: [
            ...seccion.registros,
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

  updateSectionsOrder(rowId: string | number, newOrder: Seccion[]) {
    const current = this.acuses(); // signal
    const updated = current.map(r =>
      r.id === rowId
        ? { ...r, secciones: [...newOrder] }
        : r
    );

    this._acuses.set(updated);
  }

  insertSeccionAt(acuseId: string, seccion: Seccion, index: number) {
    this._acuses.update(acuses =>
      acuses.map(a => {
        if (a.id !== acuseId) return a;

        const newList = [...a.secciones];
        newList.splice(index, 0, seccion);

        // recalcular posiciones
        const updated = newList.map((s, i) => ({ ...s, qtPosicion: i + 1 }));

        return { ...a, secciones: updated };
      })
    );
  }

  deleteSection(sectionId: string | number) {
    this._acuses.update(acuses =>
      acuses.map(acuse => ({
        ...acuse,
        secciones: acuse.secciones.filter(s => s.id !== sectionId)
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
  private mapSeccionesDesdeBD(secciones: Seccion[]): any[] {
    return secciones.map(seccion => {

      // aplica solo a secciones con contenido editable (si aplica)
      if (seccion.qtTipo === 1 || seccion.qtTipo === 2 && seccion.registros) {

        seccion.registros.forEach((registro: Registro) => {

          registro.columnas.forEach(col => {

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
  private prepararSeccionesParaGuardar(secciones: any[]): any[] {
    return secciones.map(seccion => {

      if (seccion.qtTipo === 1 && seccion.sisaiTwAcuseRegistros) {

        seccion.sisaiTwAcuseRegistros.forEach((registro: Registro) => {

          registro.columnas.forEach(col => {

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

}