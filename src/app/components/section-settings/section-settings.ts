import { Component, computed, inject } from "@angular/core";
import { Form } from "../../services/form";
import { FieldTypes } from "../../services/field-types";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-field-settings',
    imports: [MatFormFieldModule, MatInputModule, FormsModule],
    template: `
   <div class="p-6 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border border-gray-200 shadow-sm">

        @if(formService.selectedSection(); as section){

            <h3 class="text-2xl font-semibold mb-6">Propiedades de la Sección {{section.type}}</h3>

            <!-- NOMBRE DE LA SECCIÓN -->
            <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>Nombre de la sección</mat-label>
                <input 
                    matInput
                    [ngModel]="section.dsNombre"
                    (ngModelChange)="updateSeccion(section.id, $event)"
                />
            </mat-form-field>

            <!-- TÍTULO -->
            <mat-form-field appearance="outline" class="w-full mb-8">
                <mat-label>Título</mat-label>
                    <input 
                    matInput
                    [ngModel]="section.dsTitulo"
                    (ngModelChange)="updateSeccion(section.id, $event)"
                />
            </mat-form-field>

            <!-- COLUMNAS -->
            <h4 class="text-lg font-medium mb-4">Contenido de columnas</h4>

            @for (registro of section.registros; track registro.id) {
                <div class="flex flex-col gap-6">

                    @for (columna of registro.columnas; track columna.id) {

                        <mat-form-field appearance="outline" class="w-full">
                            <mat-label>{{ columna.estilo.dsNombre }}</mat-label>
                            <textarea 
                                matInput 
                                rows="3"
                                 class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 
         resize-none leading-6 overflow-y-auto max-h-32"
                                [ngModel]="columna.dsValor"
                                (ngModelChange)="updateColumna(columna.id, $event)"
                            ></textarea>
                        </mat-form-field>

                    }

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


    fieldValues = computed(() => {
        const field = this.formService.selectedSection();
        if (!field) return {};
        return field as any;
    });

    updateColumna(fieldId: string, value: any) {
        console.log(fieldId, value);
        this.formService.updateColumna(fieldId, value);
    }

    updateSeccion(fieldId:string, value:any) {
           console.log(fieldId, value);
           this.formService.updateSeccion(fieldId,value);
    }
}