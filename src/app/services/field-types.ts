import { Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';
import { SectionUno } from '../components/section-types/section-uno';
import { SectionDos } from '../components/section-types/section-dos';
import { SectionTres } from '../components/section-types/section-tres';

const SECTION_UNO_DEFINITION: FieldTypeDefinition = {
    type: 'seccion1',
    label: 'Sección Uno',
    icon: 'text_fields',
    component: SectionUno
}
const SECTION_DOS_DEFINITION: FieldTypeDefinition = {
    type: 'seccion2',
    label: 'Sección Dos',
    icon: 'text_fields',
     component: SectionDos
}
const SECTION_TRES_DEFINITION: FieldTypeDefinition = {
    type: 'seccion3',
    label: 'Sección Tres',
    icon: 'text_fields',
     component: SectionTres
}
@Injectable({
    providedIn: 'root',
})
export class FieldTypes {
    fieldTypes = new Map<string, FieldTypeDefinition>([
        ['seccion1', SECTION_UNO_DEFINITION],
        ['seccion2', SECTION_DOS_DEFINITION],
        ['seccion3', SECTION_TRES_DEFINITION],
  ]);

    getFieldType(type: string): FieldTypeDefinition | undefined {
        return this.fieldTypes.get(type);
    }

    getAllFieldTypes(): FieldTypeDefinition[] {
        return Array.from(this.fieldTypes.values());
    }
}