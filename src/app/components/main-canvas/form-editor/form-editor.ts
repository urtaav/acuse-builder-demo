import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../services/form';
@Component({
    selector: 'app-form-editor',
    imports: [DragDropModule,MatButtonModule,MatIconModule],
    template: `
       <div  class="p-4">
             @for (row of formService.rows(); track row.id) {
                <div>

                </div>
             }
       </div>
    `,
    styles: ``,
})
export class FormEditor {
  formService = inject(Form);
}