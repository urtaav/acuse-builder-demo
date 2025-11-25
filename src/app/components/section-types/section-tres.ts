import { Component, input } from "@angular/core";
import { Seccion } from "../../models/acuse";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-section-tres',
  imports: [FormsModule],
  template: `
<div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-6">

        <!-- NOMBRE -->
      <!-- <p class="text-xl font-semibold">{{ field().dsNombre }}</p> -->
      <!-- TÍTULO -->
      <div>
        <p class="text-gray-600 mb-1 text-sm font-medium">Título</p>
        <input
          type="text"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full bg-gray-100"
          [ngModel]="field().dsTitulo"
          readonly
        />
      </div>
      <!-- TODOS LOS REGISTROS -->
      @for (registro of field().sisaiTwAcuseRegistros; track registro.id) {
                <div class="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div class="grid gap-4"
           [class.grid-cols-1]="field().qtTipo === 1"
           [class.grid-cols-2]="field().qtTipo === 2"
           [class.grid-cols-3]="field().qtTipo === 3">

          @for (col of registro.sisaiTwAcuseColumnas; track col.id) {

              <div class="flex flex-col">

                <!-- LABEL DINÁMICO -->
                <label class="text-sm font-medium text-gray-700 mb-1">
                  {{
                    $index === 0 ? 'Descripción del Plazo' :
                    $index === 1 ? 'Plazo en días' :
                    'Fecha'
                  }}
                </label>

                <!-- INPUT ÚNICO, CON PROPIEDADES DINÁMICAS -->
                <input
                  [type]="
                    $index === 1 ? 'number' :
                    $index === 2 ? 'text' :
                    'text'
                  "

                  [min]="$index === 1 ? 1 : null"
                  [max]="$index === 1 ? 100 : null"

                  [readonly]="$index !== 1"  

                  [placeholder]="$index === 2 ? 'dd/mm/yyyy' : ''"

                  [value]="$index === 2 ? '' : col.dsValor"

                  class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100"

                  [style.color]="col.sisaiTwAcuseEstilo.dsColor"
                  [style.font-weight]="col.sisaiTwAcuseEstilo.qtNegrita === 1 ? 'bold' : 'normal'"
                  [style.text-align]="
                    col.sisaiTwAcuseEstilo.qtAlineacionH === 1 ? 'left' :
                    col.sisaiTwAcuseEstilo.qtAlineacionH === 2 ? 'center' :
                    'right'
                  "
                  [style.font-size.px]="col.sisaiTwAcuseEstilo.qtTamanio"
                />
                @if ($index === 2) {
                <input
                  type="text"
                  class="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full bg-gray-100"
                  [value]="col.dsValor"
                  readonly
                />
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
export class SectionTres {
  field = input.required<Seccion>();
}
