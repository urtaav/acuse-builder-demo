import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FieldTypeDefinition } from '../../../models/field';

@Component({
  selector: 'app-field-button',
  imports: [MatIconModule, DragDropModule],
  template: `    
    <button    
    cdkDrag
    [cdkDragData]="field()"
    (cdkDragStarted)="whileDragging.set(true)"
    (cdkDragEnded)="whileDragging.set(false)"
    class="w-full p-3 border border-gray-200 hover:border-black hover:shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer">
        <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
            <mat-icon class="scale-75">{{field().icon}}</mat-icon>
        </div>
           <span>{{field().label}}</span>
      <div *cdkDragPlaceholder></div>
    </button>
     @if (whileDragging()) {
      <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-50 flex items-center justify-center">
          <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex items-center gap-3">
          <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
              <mat-icon>{{field().icon}}</mat-icon>
          </div>
          <span>{{field().label}}</span>
          </div>
      </div> 
     }
  `,
  styles: ``,
})
export class FieldButton {
  field = input.required<FieldTypeDefinition>();
  whileDragging = signal(false);
}
