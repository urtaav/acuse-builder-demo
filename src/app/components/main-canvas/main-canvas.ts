import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Form } from '../../services/form';
import { MatButton } from "@angular/material/button";
import { FormEditor } from "./form-editor/form-editor";
import { HeaderSection } from "./form-editor/header-section/header-section";
import { stripFrontEndFields } from '../../utils/removeKeys';
@Component({
  selector: 'app-main-canvas',
  imports: [CommonModule, FormsModule, MatButtonToggleModule, MatButton, FormEditor, HeaderSection],
  template: `
<div class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border border-gray-200 shadow-sm">

  <!-- Encabezado -->
  <div class="pb-4 border-b border-gray-200 flex gap-2 items-center justify-center">
    <h3 class="text-xl font-medium">Acuse Canvas</h3>
  </div>

  <!-- ===================== ENCABEZADO ===================== -->
  <app-header-section/>

  <!-- Editor / Preview -->
  <div class="mt-6">
    @if (activeTab() === 'editor') {
      <app-form-editor></app-form-editor>
     <button matButton="filled" (click)="printJSON()">Guardar</button>
    } @else {
      <div class="p-4 text-gray-500 text-center">
        Preview mode is under construction.
      </div>
    }
  </div>

</div>

  `,
  styles: `
`,
})
export class MainCanvas {
  activeTab = signal<'preview' | 'editor'>('editor');
  formService = inject(Form);

  constructor() { }

  printJSON() {

    // 1️⃣ Obtener valores ORIGINALES sin clonarlos todavía
    const encabezadoRaw = this.formService.encabezado();
    const acuseBuilderRaw = this.formService.acuseBuilder();
    const acusesRaw = this.formService.acuses();

    if (!encabezadoRaw || !acusesRaw.length || !acuseBuilderRaw) return;

    // 2️⃣ Limpiar las secciones *sin structuredClone todavía*
    const acusesClean = acusesRaw.map(acuse => ({
      ...acuse,
      secciones: acuse.secciones.map(sec =>
        stripFrontEndFields(sec)
      )
    }));
    console.log(acusesClean)
    // 3️⃣ AHORA SÍ podemos clonar sin errores
    const encabezado = structuredClone(encabezadoRaw);
    const acuseBuilder = structuredClone(acuseBuilderRaw);
    const acuses = structuredClone(acusesClean);

    // 4️⃣ Mapear logos en encabezado
    encabezado.dsLogoIzquierdo = acuseBuilder.logoIzquierdo?.base64 || null;
    encabezado.dsLogoDerecho = acuseBuilder.logoDerecho?.base64 || null;

    // 5️⃣ Preparar secciones finalizadas
    const seccionesLimpias = this.formService.prepararsisaiTwAcuseSeccionsParaGuardar(
      acuses[0].secciones
    );

    // 6️⃣ Inyectar secciones en el acuse
    const acuseFinal = {
      ...acuses[0],
      secciones: seccionesLimpias
    };

    // 7️⃣ Inyectar acuse dentro del encabezado
    const encabezadoFinal = {
      ...encabezado,
      acuses: [acuseFinal]
    };

    // 8️⃣ Armar DTO final
    const finalDTO = {
      ...acuseBuilder,
      acuseEncabezado: encabezadoFinal
    };

    console.log("⚡ JSON Final listo para backend:");
    console.log(JSON.stringify(finalDTO, null, 2));
    console.log(finalDTO)

    return finalDTO;
  }



}