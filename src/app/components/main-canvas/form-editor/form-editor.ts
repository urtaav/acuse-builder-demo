import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../services/form';
import { FieldTypeDefinition, FormField } from '../../../models/field';
import { JsonPipe } from '@angular/common';
import { FormSectionComponent } from "../form-section/form-section";
import { Seccion } from '../../../models/acuse';
@Component({
    selector: 'app-form-editor',
    imports: [DragDropModule, MatButtonModule, MatIconModule, JsonPipe, FormSectionComponent],
    template: `
       <div  class="p-4">
             @for (row of formService.acuses(); track row.id) {
                <div  
                cdkDropList
                [cdkDropListData]="row.id"
                (cdkDropListDropped)="onDropInRow($event,row.id)"
                [cdkDropListOrientation]="'mixed'"
                class="relative p-5 pt-2 ps-10 mb-4 bg-white rounded-lg border-2 border-dashed border-gray-200">

                    <div class="flex gap-2 flex-col w-full">
                         @for (section of row.secciones; track section.id) {
                            <app-form-section-component cdkDrag [cdkDragData]="section" class="flex-1"  [section]="section"/>
                        } @empty {
                            <div class="w-full p-4 border border-dashed border-primary-container rounded text-center text-gray-400">
                                Drag and drop from elements here
                            </div>
                    }
                    </div>
                </div>
             }
       </div>
       <pre>
        {{formService.acuses() | json}}
       </pre>
    `,
    styles: ``,
})
export class FormEditor {
    formService = inject(Form);

    private get firstAcuseId() {
        return this.formService.acuses()[0]?.id;
    }


    onDropInRow(event: CdkDragDrop<string>, rowId: string) {
        console.log(event.previousContainer.data);
        if (event.previousContainer.data === 'field-selector') {
            const fieldType = event.item.data as FieldTypeDefinition;
            console.log(fieldType)

            if (fieldType.type === 'seccion1') {
                console.log("Agregar seccion1");
                const id = this.firstAcuseId;
                if (id) this.formService.addSeccionUnaColumna(id);

            }
            if (fieldType.type === 'seccion2') {
                console.log("Agregar seccion2");
                const id = this.firstAcuseId;
                if (id) this.formService.addSeccionDosColumnas(id);

            }
            if (fieldType.type === 'seccion3') {
                console.log("Agregar seccion3");
                const id = this.firstAcuseId;
                if (id) this.formService.addSeccionTresColumnas(id);

            }
            // const newField: FormField = {
            //     id: crypto.randomUUID(),
            //     type: fieldType.type,
            //     ...fieldType.defaultConfig
            // };
            // this.formService.addField(newField, rowId, event.currentIndex);
            return;
        }

        const dragData = event.item.data as Seccion;
        console.log('dragData',dragData)
        const previousRowId = event.previousContainer.data as string;
        console.log('dragpreviousRowIdData',previousRowId)
        // this.formService.moveField(dragData.id, previousRowId, rowId, event.currentIndex);

    }
}