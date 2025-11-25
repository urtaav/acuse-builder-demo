import { Component, inject } from '@angular/core';
import { Form } from '../../../../services/form';
import { FormsModule } from '@angular/forms';
import { AcuseBuilder, Encabezado } from '../../../../models/acuse';

@Component({
  selector: 'app-header-section',
  imports: [FormsModule],
  template: `
  <div class="w-full grid gap-4 p-5 pt-4 ps-10 mb-4 bg-white rounded-sm border-2 border-dashed border-gray-200">

    <!-- LOGOS + TÍTULO -->
    <div class="flex items-center justify-center gap-6">

      <!-- LOGO IZQUIERDO -->
      <div class="w-20 h-20 bg-gray-50 border rounded-lg flex items-center justify-center relative overflow-hidden">

        @if (!acuse().logoIzquierdo) {
          <label for="logoIzq"
            class="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-100 text-xs text-gray-500 hover:bg-gray-200">
            Seleccionar
          </label>
        }

        <input id="logoIzq" type="file" class="hidden"
          accept=".png,.jpg,.jpeg"
          (change)="onSelectLogo($event, 'logoIzquierdo')" />

        <img [src]="getLogo('logoIzquierdo')" class="w-full h-full object-contain" />
      </div>

      <!-- TÍTULO -->
      <div class="flex-grow bg-white px-3 py-2 border rounded-lg">
        <input 
          type="text"
          class="w-full text-center text-lg font-medium border-none outline-none"
          placeholder="Título del acuse"
          [(ngModel)]="acuse().acuseEncabezado.dsTituloPrincipal"
          maxlength="50"
          (ngModelChange)="update({ dsTituloPrincipal: $event })"
        />
      </div>

      <!-- LOGO DERECHO -->
      <div class="w-20 h-20 bg-gray-50 border rounded-lg flex items-center justify-center relative overflow-hidden">

        @if (!acuse().logoDerecho) {
          <label for="logoDer"
            class="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-100 text-xs text-gray-500 hover:bg-gray-200">
            Seleccionar
          </label>
        }

        <input id="logoDer" type="file" class="hidden"
          accept=".png,.jpg,.jpeg"
          (change)="onSelectLogo($event, 'logoDerecho')" />

        <img [src]="getLogo('logoDerecho')" class="w-full h-full object-contain" />
      </div>

    </div>

    <!-- FECHA -->
    <div class="flex justify-end items-center pr-4">
      <span class="text-sm text-gray-600">{{ acuse().acuseEncabezado.dsFecha }}</span>
    </div>

    <!-- SUBTÍTULO -->
    <div class="flex justify-center items-center">
      <input 
        type="text"
        class="w-2/3 text-center border border-gray-300 rounded py-1 outline-none"
        placeholder="Subtítulo"
        [(ngModel)]="acuse().acuseEncabezado.dsSubtitulo"
        maxlength="56"
        (ngModelChange)="update({ dsSubtitulo: $event })"
      />
    </div>

  </div>
  `,
  styles: `
  .avatar-upload {
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
export class HeaderSection {
   private formService = inject(Form);

  /** Signal directo del builder (sin loops) */
  acuse = this.formService.acuseBuilder;

  updateAcuseBuilder(update: Partial<AcuseBuilder>) {
    this.formService.updateAcuseBuilder(update);
  }
  /** Actualiza parcialmente el encabezado */
  update(update: Partial<Encabezado>) {
    this.formService.updateEncabezado(update);
  }

  /** Obtiene logo con fallback */
  getLogo(key: 'logoIzquierdo' | 'logoDerecho'): string {
    const logo = this.acuse()?.[key];
    return logo?.base64 || 'assets/img/acuses/img-placeholder.jpg';
  }

  /** Maneja carga de logo genéricamente */
  async onSelectLogo(event: Event, key: 'logoIzquierdo' | 'logoDerecho') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const base64 = await this.fileToBase64(file);
    this.updateAcuseBuilder({
      [key]: {
        base64,
        filename: file.name,
        filesize: file.size,
        filetype: file.type
      }
    });
  }

  /** Utilidad para convertir archivos a base64 */
  fileToBase64(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
