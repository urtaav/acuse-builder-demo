import { Component, inject, input } from "@angular/core";
import { Seccion } from "../../../models/acuse";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SectionPreview } from "../section-preview/section-preview";
import { Form } from "../../../services/form";

@Component({
  selector: 'app-form-section-component',
  imports: [MatButtonModule, MatIconModule, SectionPreview],
  template: `
      <div class="bg-white p-4 pt-1 rounded-lg shadow-sm border border-gray-200 hover:border-black cursor-pointer"
       [class]="formService.selectedSection()?.id === section().id ? '!border-black' : ''"
       (click)="formService.setSelectedSection(section().id)">
        <div class="flex items-center justify-end mb-1">
            <button mat-icon-button (click)="deleteField($event)"><mat-icon class="mr-2">delete</mat-icon></button>
        </div>
        <app-section-preview [section]="section()"/>
      </div>
      
      `,
  styles: ``,
})
export class FormSectionComponent {
  formService = inject(Form);
  section = input.required<Seccion>();

  deleteField(event: Event) {
    event.stopPropagation();
  }
}