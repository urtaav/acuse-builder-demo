import { Component, computed, inject } from "@angular/core";
import { Form } from "../../services/form";
import { FieldTypes } from "../../services/field-types";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { Estilo } from "../../models/acuse";

@Component({
    selector: 'app-field-settings',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatSelectModule],
    template: `
<div class="p-6 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border border-gray-200 shadow-sm">

  @if (formService.selectedSection(); as section) {

    <h5 class="text-base font-semibold mb-6">
     Aquí puedes actualizar el contenido y su formato.
    </h5>

    <!-- NOMBRE DE LA SECCIÓN -->
    <!-- <mat-form-field appearance="outline" class="w-full mb-4">
      <mat-label>Nombre de la sección</mat-label>
      <input
        matInput
        [ngModel]="section.dsNombre"
        (ngModelChange)="updateSeccion(section.id, $event)"
      />
    </mat-form-field> -->

    <!-- TÍTULO -->
    <mat-form-field appearance="outline" class="w-full mb-8">
      <mat-label>Título</mat-label>
      <input
        matInput
        [ngModel]="section.dsTitulo"
        (ngModelChange)="updateSeccion(section.id, $event)"
      />
    </mat-form-field>

    <h4 class="text-lg font-medium mb-1">Contenido</h4>
            <!-- ENCABEZADO DEL GRUPO -->
        <div class="flex items-center justify-end mb-4">
          @if (canAddRegistros(section.type, section.registros.length)) {
            <button
              mat-icon-button
              (click)="addRegistroToSeccion()"
              class="text-blue-600 hover:text-blue-700"
            >
              <mat-icon>add_circle</mat-icon>
            </button>
          }
        </div>



    <!-- REGISTROS (cada registro es un grupo visual) -->
    @for (registro of section.registros; track registro.id) {

      <div class="border-none rounded-xl p-2 mb-6 bg-gray-50">

        <!-- GRID ADAPTABLE POR TIPO -->
        <div
          class="grid gap-4"
          [class.grid-cols-1]="section.type === 'seccion1'"
          [class.grid-cols-2]="section.type === 'seccion2'"
          [class.grid-cols-3]="section.type === 'seccion3'"
        >

   @for (columna of registro.columnas; let i = $index; track columna.id) {
@if (section.type === 'seccion1') {

  <div class="flex items-center  gap-2 bg-gray-50 p-2 rounded-md border w-full">

    <!-- Color -->
    <input type="color"
      [ngModel]="columna.estilo.dsColor"
      (ngModelChange)="updateStyle(columna.id, 'dsColor', $event)"
      class="w-6 h-6 p-0 border rounded cursor-pointer"
    />

    <!-- Bold -->
    <button
      (click)="updateStyle(columna.id, 'qtNegrita', columna.estilo.qtNegrita === 1 ? 0 : 1)"
      class="w-7 h-7 text-xs flex items-center justify-center border rounded hover:bg-gray-200"
      [class.font-bold]="columna.estilo.qtNegrita === 1"
    >
      B
    </button>

    <!-- Align Left -->
    <button
      (click)="updateStyle(columna.id, 'qtAlineacionH', 1)"
      class="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200 text-[14px]"
    >
      <span class="material-icons text-[16px]">format_align_left</span>
    </button>

    <!-- Align Center -->
    <button
      (click)="updateStyle(columna.id, 'qtAlineacionH', 2)"
      class="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200"
    >
      <span class="material-icons text-[16px]">format_align_center</span>
    </button>

    <!-- Align Right -->
    <button
      (click)="updateStyle(columna.id, 'qtAlineacionH', 3)"
      class="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200"
    >
      <span class="material-icons text-[16px]">format_align_right</span>
    </button>

    <!-- Font Size (mini) -->
    <input type="number"
      min="8"
      max="16"
      [ngModel]="columna.estilo.qtTamanio"
      (ngModelChange)="updateStyle(columna.id, 'qtTamanio', $event)"
      class="w-14 h-7 px-1 text-xs border rounded"
      placeholder="Size"
    />

  </div>
}

  <!-- SECCIÓN 1 -->
  @if (section.type === 'seccion1') {
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Texto libre</mat-label>
      <textarea
        matInput
        rows="2"
        class="resize-none leading-6 overflow-y-auto max-h-32"
        [style.color]="columna.estilo.dsColor"
        [style.font-weight]="columna.estilo.qtNegrita === 1 ? 'bold' : 'normal'"
        [style.text-align]="columna.estilo.qtAlineacionH === 1 ? 'left' : columna.estilo.qtAlineacionH === 2 ? 'center' : 'right'"
        [style.font-size.px]="columna.estilo.qtTamanio"
        [ngModel]="columna.dsValor"
        (ngModelChange)="updateColumna(columna.id, $event)"
      ></textarea>
    </mat-form-field>
  }

  <!-- SECCIÓN 2 -->
@else if(section.type === 'seccion2') {

  <!-- INPUT: índices pares -->
  @if(i % 2 === 0) {
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Campo</mat-label>
      <input
        matInput
        type="text"
        [ngModel]="columna.dsValor"
        (ngModelChange)="updateColumna(columna.id, $event)"
      />
    </mat-form-field>
  }

  <!-- SELECT: índices nones -->
  @else {
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Valor</mat-label>
      <mat-select
        [ngModel]="columna.dsValor"
        (ngModelChange)="updateColumna(columna.id, $event)"
      >
        @for (option of [1,2,3,4]; track option) {
          <mat-option [value]="'option ' + option">
            option {{option}}
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  }

}


  <!-- SECCIÓN 3 -->
  @else if(section.type === 'seccion3') {
    <mat-form-field appearance="outline" class="w-full">
                    @if ($index === 0) {
               <mat-label>
                Descripción del Plazo
             </mat-label>
            }
             @if ($index === 1) {
              <mat-label>
                Plazo en días 
                 </mat-label>
            }

              @if ($index === 2) {
                 <mat-label>
                Fecha calculada (dd/mm/yyyy)
              </mat-label>
            }
      <input 
        matInput 
        type="text"
        [ngModel]="columna.dsValor"
        (ngModelChange)="updateColumna(columna.id, $event)" 
        [disabled]="$index === 2"/>
    </mat-form-field>
  }

}

        </div>

      </div>

    }

  }
</div>

    `,
    styles: ``,
})
export class SectionSettings {
    formService = inject(Form);
    fieldTypeService = inject(FieldTypes);

    private readonly maxColumnsByType: Record<string, number> = {
        seccion2: 10,
        seccion3: 18 // tu límite actual
    };

    fieldValues = computed(() => {
        const field = this.formService.selectedSection();
        if (!field) return {};
        return field as any;
    });

    updateColumna(fieldId: string, value: any) {
        console.log(fieldId, value);
        this.formService.updateColumna(fieldId, value);
    }

    updateSeccion(fieldId: string, value: any) {
        console.log(fieldId, value);
        this.formService.updateSeccion(fieldId, value);
    }

    addColum() {
        const section = this.formService.selectedSection();
        if (section) {
            this.formService.addColumnaToSeccion(section.id, section.type);
        }
    }

    addRegistroToSeccion() {
        const section = this.formService.selectedSection();
        if (section) {
            this.formService.addRegistroToSeccion(section.id, section.type);
        }
    }

    canAddRegistros(sectionType: string, currentRegistros: number): boolean {
        const limit = this.maxColumnsByType[sectionType];

        if (sectionType === 'seccion2') {
            return currentRegistros + 2 <= limit;
        }

        if (sectionType === 'seccion3') {
            return currentRegistros + 3 <= limit;
        }

        return false;
    }

updateStyle(columnaId: string, field: keyof Estilo, value: any) {
  this.formService.updateColumnaStyle(columnaId, field, value);
}
}