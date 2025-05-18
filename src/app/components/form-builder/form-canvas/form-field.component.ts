import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../models/form';
import { FormService } from '../../../services/form.service';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FieldPreviewComponent } from "./preview/field-preview.component";
@Component({
  selector: 'app-form-field',
  imports: [
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
    FieldPreviewComponent
],
  template: `
    <div class="bg-white p-4 pt-1 rounded-lg shadow-sm border border-gray-200 field cursor-pointer"
      [class]="formService.selectedField()?.id == field().id ? 'selected-field' : ''" 
      (click)="formService.setSelectedField(field().id)"
      > 
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm">{{ field().type | titlecase }}</span>
        <button mat-icon-button (click)="removeField($event)">
          <mat-icon class="-mr-2">delete</mat-icon>
        </button>
      </div>

      <app-field-preview [field]="field()" />
    </div>
  `,
  styles: `
  
  .field:hover{
    border-color: #006591 !important;
  }

  .selected-field{
    background-color: #f0f9ff !important;
    border-color: #006591 !important;
  }
  `
})
export class FormFieldComponent {
  field = input.required<FormField>();

  formService = inject(FormService);

  removeField(e: Event){
    e.stopPropagation();
    this.formService.removeField(this.field().id);
  }
}
