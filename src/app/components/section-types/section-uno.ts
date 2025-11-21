import { Component, input } from "@angular/core";
import { Seccion } from "../../models/acuse";
import { FormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-section-uno',
  imports: [FormsModule,MatFormFieldModule,MatInputModule],
  template: `
   <div class="p-6 bg-white rounded-sm  border border-gray-200 space-y-6">

      <!-- NOMBRE -->
      <!-- <p class="text-xl font-semibold">{{ field().dsNombre }}</p> -->

      <!-- TÍTULO -->
      <div>
        <!-- <p class="text-gray-600 mb-1 text-sm font-medium">Título</p> -->
        <input
          type="text"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm w-1/2 bg-gray-100"
          [ngModel]="field().dsTitulo"
          readonly
        />
      </div>

      <!-- COLUMNAS (auto-grid) -->
      <div class="grid gap-6"
           [class.grid-cols-1]="field().qtTipo === 1"
           [class.grid-cols-2]="field().qtTipo === 2"
           [class.grid-cols-3]="field().qtTipo === 3">

        @for (col of field().registros[0].columnas; track col.id) {

          <div class="flex flex-col ">
              <textarea
                rows="2"
                class="resize-none leading-6 overflow-y-auto max-h-32 border border-gray-300 rounded-lg px-3 py-2 text-sm w-1/2 bg-gray-100 w-full"
                [style.color]="col.estilo.dsColor"
                [style.font-weight]="col.estilo.qtNegrita === 1 ? 'bold' : 'normal'"
                [style.text-align]="col.estilo.qtAlineacionH === 1 ? 'left' : col.estilo.qtAlineacionH === 2 ? 'center' : 'right'"
                [style.font-size.px]="col.estilo.qtTamanio"
                [ngModel]="col.dsValor"
                readonly
              ></textarea>
          </div>

        }

      </div>

    </div>
  `,
  styles: ``,
})
export class SectionUno {
  field = input.required<Seccion>();
}
