import { computed, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
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
  }
}