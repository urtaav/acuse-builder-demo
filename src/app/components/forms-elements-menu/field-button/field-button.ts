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
<div 
  *cdkDragPlaceholder
  class="w-full h-12 border-2 border-dashed border-gray-400 bg-gray-100/60 
         rounded-lg flex items-center justify-center text-gray-500 text-sm 
         animate-pulse"
>
    <mat-icon class="text-gray-400 mr-2">touch_app</mat-icon>
    Suelta aquí para agregar
</div>

    </button>
@if (whileDragging()) {
  <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-50 flex items-center justify-center">
      <div class="px-4 py-3 bg-white rounded-lg shadow-xl border border-gray-200 flex items-center gap-3 scale-110">
          <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
              <mat-icon>{{field().icon}}</mat-icon>
          </div>
          <span class="font-medium">{{field().label}}</span>
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
