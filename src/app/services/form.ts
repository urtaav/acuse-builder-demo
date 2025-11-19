import { computed, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';
@Injectable({
  providedIn: 'root',
})
export class Form {
  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();


  constructor() {
    this._rows.set([
      { id: crypto.randomUUID(), fields: [] },
    ]);
  }
  addRow() {
    console.log('Row added');
    const rows = this._rows();
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: []
    };
    this._rows.set([...rows, newRow]);

    console.log(this._rows());
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) return;

    const rows = this._rows();
    const newRows = rows.filter(row => row.id !== rowId);
    this._rows.set(newRows);
  }

  moveRowUp(rowId: string) {
    const rows = this._rows();
    const index = rows.findIndex(r => r.id === rowId);
    if (index > 0) {
      const newRows = [...rows];
      const temp = newRows[index - 1];
      newRows[index - 1] = newRows[index];
      newRows[index] = temp;
      this._rows.set(newRows);
    }
  }

  moveRowDown(rowId: string) {
    const rows = this._rows();
    const index = rows.findIndex(r => r.id === rowId);
    if (index < rows.length - 1) {
      const newRows = [...rows];
      const temp = newRows[index + 1];
      newRows[index + 1] = newRows[index];
      newRows[index] = temp;
      this._rows.set(newRows);
    }
  }


  addField(field: FormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map(row => {
      if (row.id === rowId) {
        const updateFields = [...row.fields];
        if (index !== undefined) {
          updateFields.splice(index, 0, field);
        } else {
          updateFields.push(field);
        }
        return { ...row, fields: updateFields };
      }
      return row;
    });
    this._rows.set(newRows);
  }

  moveField(fieldId: string, sourcerRowId: string, targetRowId: string, targetIndex: number = -1) {
    const rows = this._rows();
    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;
    rows.forEach((row, rowIndex) => {
      if (row.id === sourcerRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex(f => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });
    if (!fieldToMove) return;
    const newRows = [...rows];
    const fieldWithRemovedField = newRows[sourceRowIndex].fields.filter(f => f.id !== fieldId);
    newRows[sourceRowIndex].fields = fieldWithRemovedField;

    const targetRowIndex = newRows.findIndex(r => r.id === targetRowId);

    if (targetIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }
    this._rows.set(newRows);
  }
}