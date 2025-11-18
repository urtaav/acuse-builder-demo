import { Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';

const SECTION_UNO_DEFINITION: FieldTypeDefinition = {
    type: 'text',
    label: 'Sección Uno',
    icon: 'text_fields',
}
const SECTION_DOS_DEFINITION: FieldTypeDefinition = {
    type: 'text',
    label: 'Sección Dos',
    icon: 'text_fields',
}
const SECTION_TRES_DEFINITION: FieldTypeDefinition = {
    type: 'text',
    label: 'Sección Tres',
    icon: 'text_fields',
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