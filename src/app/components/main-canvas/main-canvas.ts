import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from "@angular/material/icon";
import { Form } from '../../services/form';
import { MatButton } from "@angular/material/button";
import { FormEditor } from "./form-editor/form-editor";
import { Encabezado } from '../../models/acuse';
@Component({
    selector: 'app-main-canvas',
    imports: [CommonModule, FormsModule, MatButtonToggleModule, MatButton, MatIcon, FormEditor],
    template: `
<div class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border border-gray-200 shadow-sm">

  <!-- Encabezado -->
  <div class="pb-4 border-b border-gray-200 flex gap-2 items-center justify-center">
    <h3 class="text-xl font-medium">Acuse Canvas</h3>
  </div>

  <!-- ===================== ENCABEZADO ===================== -->
  <div class="w-full grid gap-4 py-4">

    <!-- ========= LOGO IZQUIERDO – TÍTULO – LOGO DERECHO ========= -->
    <div class="flex items-center justify-center gap-6">

      <!-- LOGO IZQUIERDO -->
      <div class="w-20 h-20 bg-gray-50 border rounded-lg flex items-center justify-center relative overflow-hidden">

        <!-- SOLO aparece si NO hay logo -->
        <label 
          *ngIf="!formService.encabezado()?.dsLogoIzquierdo"
          for="logoIzq"
          class="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-100 text-xs text-gray-500 hover:bg-gray-200"
        >
          Seleccionar
        </label>

        <input  
          id="logoIzq"
          type="file"
          class="hidden"
          (change)="onSelectLogoIzquierdo($event)"
          accept=".png,.jpg,.jpeg"
        />

        <img
          class="w-full h-full object-contain"
          [src]="formService.encabezado()?.dsLogoIzquierdo?.base64 || 'assets/img/acuses/img-placeholder.jpg'"
        />

      </div>

      <!-- TÍTULO PRINCIPAL -->
      <div class="flex-grow bg-white px-3 py-2 border rounded-lg">
        <input 
          type="text"
          class="w-full text-center text-lg font-medium border-none outline-none"
          placeholder="Título del acuse"
          [(ngModel)]="formService.encabezado()!.dsTituloPrincipal"
          maxlength="38"
        />
      </div>

      <!-- LOGO DERECHO -->
      <div class="w-20 h-20 bg-gray-50 border rounded-lg flex items-center justify-center relative overflow-hidden">

        <!-- SOLO aparece si NO hay logo -->
        <label 
          *ngIf="!formService.encabezado()?.dsLogoDerecho"
          for="logoDer"
          class="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-100 text-xs text-gray-500 hover:bg-gray-200"
        >
          Seleccionar
        </label>

        <input  
          id="logoDer"
          type="file"
          class="hidden"
          (change)="onSelectLogoDerecho($event)"
          accept=".png,.jpg,.jpeg"
        />

        <img
          class="w-full h-full object-contain"
          [src]="formService.encabezado()?.dsLogoDerecho?.base64 || 'assets/img/acuses/img-placeholder.jpg'"
        />

      </div>

    </div>

    <!-- FECHA -->
    <div class="flex justify-end items-center pr-4">
      <span class="text-sm text-gray-600">{{ formService.encabezado()?.dsFecha }}</span>
    </div>

    <!-- SUBTÍTULO -->
    <div class="flex justify-center items-center">
      <input 
        type="text"
        class="w-2/3 text-center border border-gray-300 rounded py-1 outline-none"
        placeholder="Subtítulo"
        [(ngModel)]="formService.encabezado()!.dsSubtitulo"
        maxlength="56"
      />
    </div>

  </div>

  <!-- Editor / Preview -->
  <div class="mt-6">
    @if (activeTab() === 'editor') {
      <app-form-editor></app-form-editor>
       <button class="flex items-center justify-center border rounded hover:bg-gray-200"
                  (click)="printJSON()">
                  Guardar
                </button>
    } @else {
      <div class="p-4 text-gray-500 text-center">
        Preview mode is under construction.
      </div>
    }
  </div>

</div>

  `,
    styles: `.avatar-upload {
  position: relative;
  width: 100%;
  height: 100%;
}

.avatar-upload .avatar-edit input {
  display: none;
}

.avatar-upload .avatar-edit label {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`,
})
export class MainCanvas {
    activeTab = signal<'preview' | 'editor'>('editor');
    formService = inject(Form);

    encabezado = this.formService.encabezado;

    constructor() { }

    /** Actualiza cualquier campo del encabezado */
    updateEncabezado(update: Partial<Encabezado>) {
        this.formService.updateEncabezado(update);
    }

    /** Obtener logo con fallback */
    getLogo(side: 'izquierdo' | 'derecho'): string {
        const enc = this.encabezado();
        const logo = side === 'izquierdo' ? enc?.dsLogoIzquierdo : enc?.dsLogoDerecho;

        if (logo?.base64) return logo.base64;
        return 'assets/img/acuses/img-placeholder.jpg';
    }

    /** Manejar carga del logo */
    async onSelectLogo(event: any, side: 'izquierdo' | 'derecho') {
        const file = event.target.files[0];
        if (!file) return;

        const base64 = await this.fileToBase64(file);

        const dsLogo = {
            base64,
            filename: file.name,
            filesize: file.size,
            filetype: file.type
        };

        if (side === 'izquierdo') {
            this.updateEncabezado({ dsLogoIzquierdo: dsLogo });
        } else {
            this.updateEncabezado({ dsLogoDerecho: dsLogo });
        }
    }

    /** Convertir archivo a base64 */
    fileToBase64(file: File): Promise<string> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target!.result as string);
            reader.readAsDataURL(file);
        });
    }

    onSelectLogoIzquierdo(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;

            this.formService.updateEncabezado({
                dsLogoIzquierdo: {
                    base64,
                    filename: file.name,
                    filesize: file.size,
                    filetype: file.type
                }
            });
        };
        reader.readAsDataURL(file);
    }

    onSelectLogoDerecho(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;

            this.formService.updateEncabezado({
                dsLogoDerecho: {
                    base64,
                    filename: file.name,
                    filesize: file.size,
                    filetype: file.type
                }
            });
        };
        reader.readAsDataURL(file);
    }

    printJSON() {
        console.log(JSON.stringify(this.formService.encabezado(), null, 2));
    }
}