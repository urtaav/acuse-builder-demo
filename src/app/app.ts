import { Component, signal } from '@angular/core';
import { MainCanvas } from "./components/main-canvas/main-canvas";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormElementsMenu } from './components/forms-elements-menu/form-elements-menu';
import { SectionSettings } from "./components/section-settings/section-settings";

@Component({
  selector: 'app-root',
  imports: [FormElementsMenu, MainCanvas, DragDropModule, SectionSettings],
  template: `
    <div class="flex flex-col h-screen bg-gray-100 px-4">
      <div class="flex flex-col gap-1 items-center justify-center py-10">
          <h1 class="text-2xl tracking-wide font-medium">
          Acuse builder
        </h1>
        <p class="text-gray-500">
          Create beautiful, responsive forms with Angular Material and TailwindCSS
        </p>
      </div>
       <div class="flex gap-4 relative" cdkDropListGroup>
          <app-form-elements-menu class="w-64"/>
          <app-main-canvas class="flex-1"/>
          <app-field-settings class="w-64"/>
       </div>
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('acuse-builder');
}
