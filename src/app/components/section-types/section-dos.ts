import { Component, input } from "@angular/core";
import { Seccion } from "../../models/acuse";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-section-dos',
  imports: [FormsModule, MatSelectModule],
  template: `
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-6">

      <!-- NOMBRE -->
      <!-- <p class="text-xl font-semibold">{{ field().dsNombre }}</p> -->

      <!-- TÍTULO -->
      <div>
        <p class="text-gray-600 mb-1 text-sm font-medium">Título</p>
        <input
          type="text"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm w-1/2 bg-gray-100"
          [ngModel]="field().dsTitulo"
          readonly
        />
      </div>

      <!-- TODOS LOS REGISTROS -->
      @for (registro of field().sisaiTwAcuseRegistros; track registro.id) {

        <div class="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">

          <!-- GRID dinámico según el tipo -->
          <div class="grid gap-4"
                [class.grid-cols-1]="field().qtTipo === 1"
                [class.grid-cols-2]="field().qtTipo === 2"
                [class.grid-cols-3]="field().qtTipo === 3">

            <!-- COLUMNAS DEL REGISTRO -->
            @for (col of registro.sisaiTwAcuseColumnas; track col.id) {
              <div class="flex flex-col">

                <label class="text-sm font-medium text-gray-700 mb-1">
                  Campo
                </label>

                <!-- TIPO 1 → textarea -->
                @if (field().qtTipo === 1) {
                  <textarea
                    rows="3"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 resize-none overflow-y-auto max-h-32"

                    readonly
                    [ngModel]="col.dsValor"
                  ></textarea>
                }

                <!-- TIPO 2 o 3 → input normal -->
                @else {

                  <input
                    type="text"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100"
                    [style.color]="col.sisaiTwAcuseEstilo.dsColor"
                    [style.font-weight]="col.sisaiTwAcuseEstilo.qtNegrita === 1 ? 'bold' : 'normal'"
                    [style.text-align]="col.sisaiTwAcuseEstilo.qtAlineacionH === 1 ? 'left' : col.sisaiTwAcuseEstilo.qtAlineacionH === 2 ? 'center' : 'right'"
                    [style.font-size.px]="col.sisaiTwAcuseEstilo.qtTamanio"
                    readonly
                    [ngModel]="col.dsValor"
                  />
                  <!-- @if ($index === 0) {
                  <input
                    type="text"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100"
                    readonly
                    [ngModel]="col.dsValor"
                  />
                  } @else {
                    <mat-form-field appearance="outline" class="w-full">
                        <mat-label>Valor</mat-label>
                        <mat-select [ngModel]="col.dsValor" disabled>
                          @for (option of [1,2,3,4]; track option) {
                            <mat-option [value]="'option ' + option">
                              option {{option}}
                            </mat-option>
                          }
                        </mat-select>
                    </mat-form-field>
                  } -->
             
                }

              </div>
            }

          </div>

        </div>

      }

    </div>
  `,
  styles: ``,
})
export class SectionDos {
  field = input.required<Seccion>();
}
