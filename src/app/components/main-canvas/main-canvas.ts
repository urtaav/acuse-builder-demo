import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from "@angular/material/icon";
import { Form } from '../../services/form';
import { MatButton } from "@angular/material/button";
import { FormEditor } from "./form-editor/form-editor";
@Component({
    selector: 'app-main-canvas',
    imports: [CommonModule, FormsModule, MatButtonToggleModule, MatButton, MatIcon, FormEditor],
    template: `
<div class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm">

         <div class="pb-4 border-b border-gray-200 flex gap-2 items-center">
             <h3 class="text-xl font-medium">Acuse Canvas</h3>
             <mat-button-toggle-group  [(value)]="activeTab" hideSigleSelectionIndicator="true">
                <mat-button-toggle value="editor">Editor Mode</mat-button-toggle>
                <mat-button-toggle value="preview">Preview Mode</mat-button-toggle>
             </mat-button-toggle-group>
            @if (activeTab() === 'editor') {
                <div class="flex-1"></div>
                <button mat-flat-button (click)="formService.acuse()">Add row
                    <mat-icon class="ml-2">add_circle</mat-icon>
                </button>
            }
         </div>
            @if (activeTab() === 'editor') {
                <app-form-editor></app-form-editor>
            } @else {
                <div class="p-4 text-gray-500 text-center">
                    Preview mode is under construction.
                </div>
            }
     </div>
    `,
    styles: ``,
})
export class MainCanvas {
    activeTab = signal<'preview' | 'editor'>('editor');
    formService = inject(Form);
}