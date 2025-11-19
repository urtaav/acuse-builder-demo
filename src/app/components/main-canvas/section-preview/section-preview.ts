import { NgComponentOutlet } from "@angular/common";
import { Component, computed, inject, input } from "@angular/core";
import { Seccion } from "../../../models/acuse";
import { FieldTypes } from "../../../services/field-types";

@Component({
    selector: 'app-section-preview',
    imports: [NgComponentOutlet],
    template: `<ng-container [ngComponentOutlet]="previewComponent()" [ngComponentOutletInputs]="{ field: section()}"></ng-container>`,
    styles: ``,
})
export class SectionPreview {
    fieldTypesService = inject(FieldTypes)
    section = input.required<Seccion>();

    previewComponent = computed(() => {
        console.log(this.section().type)
        return this.fieldTypesService.getFieldType(this.section().type)?.component ?? null;
    });
}