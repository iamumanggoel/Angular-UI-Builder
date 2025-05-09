import { Component, inject, signal } from '@angular/core';
import { StyleDirective } from '../../../directives/style.directive';
import { FormEditorComponent } from "./form-editor.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreviewComponent } from "./preview/form-preview.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../services/form.service';
@Component({
  selector: 'app-form-canvas',
  imports: [
    StyleDirective,
    FormEditorComponent,
    MatButtonToggleModule,
    FormPreviewComponent,
    MatButtonModule,
    MatIconModule
],
  template: `
    <div [appStyle]="'primary-container'" class="h-[calc(100vh-150px)] overflow-y-auto">

      <div class="pb-4 border-b border-gray-200 flex gap-2 items-center">
        <h3 class="text-xl font-medium">Form Canvas</h3>
        <mat-button-toggle-group [(value)]="activeTab" hideSingleSelectionIndicator="true">
          <mat-button-toggle value="editor">Editor</mat-button-toggle>
          <mat-button-toggle value="preview">Preview</mat-button-toggle>
        </mat-button-toggle-group>
        @if(activeTab() === 'editor') {
          <div class="flex-1"></div>
          <button mat-flat-button (click)="formService.addRow()">
            Add Row
            <mat-icon>add_circle</mat-icon>
          </button>
        }
      </div>

      @if(activeTab() === 'editor') {
        <app-form-editor />
      }
      @else {
        <app-form-preview />
      }

    </div>
  `,
  styles: ``
})
export class FormCanvasComponent {
  activeTab = signal<'editor' | 'preview'>('editor');

  formService = inject(FormService);
}
