import { Component, inject } from '@angular/core';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { FieldTypes } from '../services/field-types';
import { FieldButton } from './field-button/field-button';

@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButton,DragDropModule],
  template: `
    <div class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm flex flex-col gap-4">
      <h3 class="text-xl font-medium mb-4"> Form Elements</h3>
      <div class="flex flex-col gap-4 elements-menu" 
        cdkDropList 
        cdkDropListSortingDisabled="true"
        [cdkDropListData]="'field-selector'"
        [cdkDropListEnterPredicate]="noDropAllowed">
         @for (type of fieldTypes; track type.type) {
            <app-field-button [field]="type"/>
          }
      </div>
    </div>
  `,
  styles: ``,
})
export class FormElementsMenu {
  fieldTypesService = inject(FieldTypes);
  fieldTypes = this.fieldTypesService.getAllFieldTypes();

  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }

}
