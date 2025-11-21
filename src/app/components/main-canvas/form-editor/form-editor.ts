import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../services/form';
import { FieldTypeDefinition } from '../../../models/field';
import { JsonPipe } from '@angular/common';
import { FormSectionComponent } from "../form-section/form-section";
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
                class="relative p-5 pt-2 ps-10 mb-4 bg-white rounded-sm border-2 border-dashed border-gray-200">
                    <div       
                            cdkDropList
                            [cdkDropListData]="row.secciones"
                            (cdkDropListDropped)="onDropSection($event, row.id)" 
                            class="flex gap-2 flex-col w-full">
                         @for (section of row.secciones; track section.id) {
                            <div cdkDrag [cdkDragData]="section" class="border rounded">

                                <div 
                                    cdkDragHandle
                                    class="bg-gray-100 border-b px-3 py-1 text-sm text-gray-600 cursor-move flex items-center gap-2"
                                >
                                    <mat-icon class="text-base">drag_indicator</mat-icon>
                                    Mover sección
                                </div>

                                <app-form-section-component class="flex-1" [section]="section"/>
                            </div>
                        } @empty {
                            <div class="w-full p-4 border border-dashed border-primary-container rounded text-center text-gray-400">
                                Drag and drop from elements here
                            </div>
                    }
                    </div>
                </div>
             }
       </div>
        <pre class="max-h-80 overflow-auto bg-gray-900 text-green-300 text-xs p-4 rounded-lg whitespace-pre-wrap break-all">
        {{ formService.acuses() | json }}
        </pre>

    `,
    styles: ``,
})
export class FormEditor {
    formService = inject(Form);

    private get firstAcuseId() {
        return this.formService.acuses()[0]?.id;
    }


    onDropInRow(event: CdkDragDrop<string | number>, rowId: string | number) {
        if (event.previousContainer.data === 'field-selector') {
            const fieldType = event.item.data as FieldTypeDefinition;

            const id = this.firstAcuseId;
            if (!id) return;

            if (fieldType.type === 'seccion1') this.formService.addSeccionUnaColumna(id);
            if (fieldType.type === 'seccion2') this.formService.addSeccionDosColumnas(id);
            if (fieldType.type === 'seccion3') this.formService.addSeccionTresColumnas(id);

            return;
        }
    }

    onDropSection(event: CdkDragDrop<any[]>, rowId: string | number) {
        if (!event.isPointerOverContainer) return;

        // reordenamiento dentro del mismo row
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        this.formService.updateSectionsOrder(rowId, event.container.data);
    }
}