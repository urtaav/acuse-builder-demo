import { Component, computed, inject, signal } from "@angular/core";
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
    <div class="flex items-center justify-end mb-4">
        <button
          mat-icon-button
          (click)="formService.setSelectedSection(null)"
          class="text-blue-600 hover:text-blue-700"
        >
          <mat-icon>close</mat-icon>
        </button>
      
    </div>
  @if (formService.selectedSection(); as section) {

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

    <!-- BOTÓN AGREGAR REGISTRO -->
    <div class="flex items-center justify-end mb-4">
      @if (canAddRegistros(section.type, section.sisaiTwAcuseRegistros.length)) {
        <button
          mat-icon-button
          (click)="addRegistroToSeccion()"
          class="text-blue-600 hover:text-blue-700"
        >
          <mat-icon>add_circle</mat-icon>
        </button>
      }
    </div>

    @for (registro of section.sisaiTwAcuseRegistros; track registro.id) {

      <div class="border-none rounded-xl p-4 mb-6 bg-gray-50">

        <!-- GRID PRINCIPAL MEJORADO -->
        <div
          class="grid gap-4"
          [class.grid-cols-1]="section.type === 'seccion1'"
          [class.grid-cols-2]="section.type === 'seccion2'"
          [class.grid-cols-2]="section.type === 'seccion3'"
        >

          @for (columna of registro.sisaiTwAcuseColumnas; let i = $index; track columna.id) {

            <!--  BARRA DE ESTILOS: SIEMPRE AJUSTADA A LA CELDA CORRESPONDIENTE -->
            @if(i != 2){
            <div class="flex items-center gap-2 bg-gray-100 p-2 rounded-md border w-full col-span-1">

         
              <!-- Color -->
              <input type="color"
                [ngModel]="columna.sisaiTwAcuseEstilo.dsColor"
                (ngModelChange)="updateStyle(columna.id, 'dsColor', $event)"
                class="w-6 h-6 p-0 border rounded cursor-pointer"
              />

              <!-- Bold -->
              <button
                (click)="updateStyle(columna.id, 'qtNegrita', columna.sisaiTwAcuseEstilo.qtNegrita === 1 ? 0 : 1)"
                class="w-7 h-7 text-xs flex items-center justify-center border rounded hover:bg-gray-200"
                [class.font-bold]="columna.sisaiTwAcuseEstilo.qtNegrita === 1"
              >
                B
              </button>

              @if (section.type === 'seccion1') {
                <!-- Alineación -->
                <button class="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200"
                  (click)="updateStyle(columna.id, 'qtAlineacionH', 1)">
                  <span class="material-icons text-[16px]">format_align_left</span>
                </button>

                <button class="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200"
                  (click)="updateStyle(columna.id, 'qtAlineacionH', 2)">
                  <span class="material-icons text-[16px]">format_align_center</span>
                </button>

                <button class="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200"
                  (click)="updateStyle(columna.id, 'qtAlineacionH', 3)">
                  <span class="material-icons text-[16px]">format_align_right</span>
                </button>
              }

              <!-- Font Size -->
              <input type="number"
                min="8"
                max="16"
                [ngModel]="columna.sisaiTwAcuseEstilo.qtTamanio"
                (ngModelChange)="updateStyle(columna.id, 'qtTamanio', $event)"
                class="w-14 h-7 px-1 text-xs border rounded"
              />
            </div>
   }
            <!--  SECCIÓN 1: textarea abajo de la barra -->
            @if (section.type === 'seccion1') {
              <mat-form-field appearance="outline" class="w-full col-span-1">
                <mat-label>Texto libre</mat-label>
                <textarea
                  matInput
                  rows="2"
                  class="resize-none leading-6 overflow-y-auto max-h-32"
                  (focus)="onFocusTextarea($event)"
                  (click)="onCursorChange()"
                  (keyup)="onCursorChange()"
                  [ngModel]="columna.dsValor"
                  (ngModelChange)="updateColumna(columna.id, $event)"
                ></textarea>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full col-span-1">
                <mat-label>Variable</mat-label>
                <mat-select [(ngModel)]="selectedVariableValue" (selectionChange)="insertValueIntoTextarea($event.value, columna)">
                  @for (option of optionsVariables(); track option) {
                    <mat-option [value]="option.dsMascara">
                      {{ option.dsMascara }}
                    </mat-option>
                  }
                </mat-select>
              </mat-form-field>
            }

            <!--  SECCIÓN 2: estilos en columna izquierda + campo en derecha -->
            @else if (section.type === 'seccion2') {

              <!-- Input para índices pares -->
              @if (i % 2 === 0) {
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

              <!-- Select para índices nones -->
              @else {
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Variable</mat-label>
                  <mat-select
                    [ngModel]="columna.dsValor"
                    (ngModelChange)="updateColumna(columna.id, $event, section.type)"
                  >
                    @for (option of optionsVariables(); track option) {
                      <mat-option [value]="option.dsVariable">
                        {{ option.dsMascara }}
                      </mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }
            }

            <!--  SECCIÓN 3 (3 columnas) -->
            @else if (section.type === 'seccion3') {

              @if ($index === 0 || $index === 1) {
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>
                  {{ $index === 0 ? 'Descripción del Plazo' : 'Plazo en días' }}
                </mat-label>

                <input
                    matInput
                    [type]="$index === 0 ? 'text' : 'number'"
                    [min]="$index === 1 ? 1 : null"
                    [max]="$index === 1 ? 100 : null"
                    [ngModel]="columna.dsValor"
                    (ngModelChange)="updateColumna(columna.id, $event)"
                  />
              </mat-form-field>

              }

            }

          }

        </div>

      </div>

    }
  } @else {
<div class="flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
  
  <mat-icon class="text-gray-400 mb-2">info</mat-icon>
  
  <p class="text-gray-600 text-base font-medium">
    Selecciona una sección del lienzo para ver y editar su configuración.
  </p>

  <p class="text-gray-400 text-sm mt-1">
    Aquí aparecerán los ajustes de la sección seleccionada.
  </p>

</div>

  }
</div>

    `,
  styles: ``,
})
export class SectionSettings {
  formService = inject(Form);
  fieldTypeService = inject(FieldTypes);

  optionsVariables = this.formService.optionsVariables;

  private readonly maxColumnsByType: Record<string, number> = {
    seccion2: 10,
    seccion3: 18 // tu límite actual
  };

  fieldValues = computed(() => {
    const field = this.formService.selectedSection();
    if (!field) return {};
    return field as any;
  });

  updateColumna(fieldId: string | number, value: any, typeSection?: string) {
    console.log(fieldId, value);

    if (typeSection === 'seccion1' || typeSection === 'seccion2') {
      const friendlyValue = this.formService.converterMaskBeforShowInUI(value);
      this.formService.updateColumna(fieldId, friendlyValue);
    } else{
      this.formService.updateColumna(fieldId, value);
    }

   
  }

  updateSeccion(fieldId: string | number, value: any) {
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

  updateStyle(columnaId: string | number, field: keyof Estilo, value: any) {
    this.formService.updateColumnaStyle(columnaId, field, value);
  }

  // Insert value in the textarea at the cursor position
  // variables para guardar el textarea enfocado
  lastTextarea: HTMLTextAreaElement | null = null;
  cursorStart: number = 0;
  cursorEnd: number = 0;
  selectedVariableValue: string | null = null;

  // cuando se hace focus en cualquier textarea, guardamos la referencia y posiciones
  onFocusTextarea(event: any) {
    this.lastTextarea = event.target as HTMLTextAreaElement;
  }

  onCursorChange() {
    if (this.lastTextarea) {
      this.cursorStart = this.lastTextarea.selectionStart;
      this.cursorEnd = this.lastTextarea.selectionEnd;
    }
  }

  // insertar variable seleccionada en el cursor
  insertValueIntoTextarea(valueSelected: string, columna: any) {
    if (!this.lastTextarea) return;

    const original = columna.dsValor ?? '';

    const inicio = original.substring(0, this.cursorStart);
    const fin = original.substring(this.cursorEnd);

    const insert = `<${valueSelected}>`;

    const nuevoValor = inicio + insert + fin;

    // actualiza ngModel manualmente
    columna.dsValor = nuevoValor;

    // aplica el valor al DOM
    setTimeout(() => {
      this.lastTextarea!.focus();
      this.lastTextarea!.selectionStart = this.cursorStart + insert.length;
      this.lastTextarea!.selectionEnd = this.cursorStart + insert.length;
      // this.selectedVariableValue = null; // reset selected variable after insertion
    });

  }

}