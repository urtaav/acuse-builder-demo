import { Component, inject, input, signal } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FieldTypeDefinition } from '../../../models/field';
import { DomSanitizer } from '@angular/platform-browser';

const SECTION_ONE = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#000000"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
  <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
  <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
  <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
  <path d="M17 12h.01" />
  <path d="M13 12h.01" />
</svg>
`;

const SECTION_TWO = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#000000"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 6l5.5 0" />
  <path d="M4 10l5.5 0" />
  <path d="M4 14l5.5 0" />
  <path d="M4 18l5.5 0" />
  <path d="M14.5 6l5.5 0" />
  <path d="M14.5 10l5.5 0" />
  <path d="M14.5 14l5.5 0" />
  <path d="M14.5 18l5.5 0" />
</svg>
`;
const SECTION_THREE = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#000000"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
  <path d="M7 8h10" />
  <path d="M7 12h10" />
  <path d="M7 16h10" />
</svg>
`;


@Component({
  selector: 'app-field-button',
  imports: [MatIconModule, DragDropModule],
  template: `    
    <button    
    cdkDrag
    [cdkDragData]="field()"
    (cdkDragStarted)="whileDragging.set(true)"
    (cdkDragEnded)="whileDragging.set(false)"
    class="w-full p-2 border border-gray-200 hover:border-black hover:shadow-md transition-shadow rounded-lg flex items-center gap-2 cursor-pointer">
      <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
          <mat-icon [svgIcon]="field().icon"  class="scale-75">{{field().icon}}</mat-icon>
      </div>
        <span class="text-xs">{{field().label}}</span>
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
    <!-- @if (whileDragging()) {
      <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-50 flex items-center justify-center">
          <div class="px-4 py-3 bg-white rounded-lg shadow-xl border border-gray-200 flex items-center gap-3 scale-110">
              <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
                  <mat-icon  [svgIcon]="field().icon">{{field().icon}}</mat-icon>
              </div>
              <span class="font-medium">{{field().label}}</span>
          </div>
      </div> 
    } -->
  `,
  styles: ``
})
export class FieldButton {
  field = input.required<FieldTypeDefinition>();
  whileDragging = signal(false);

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer: DomSanitizer = inject(DomSanitizer);

  private readonly icons = {
    section_one: SECTION_ONE,
    section_two: SECTION_TWO,
    section_three: SECTION_THREE
  };

  constructor() {
    Object.entries(this.icons).forEach(([key, svg]) => {
      this.iconRegistry.addSvgIconLiteral(
        key,
        this.sanitizer.bypassSecurityTrustHtml(svg)
      );
    });
  }
}
