import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../models/form';
import { FormService } from '../../../services/form.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-form-field',
  imports: [
    NgComponentOutlet
  ],
  template: `
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-black cursor-pointer"> 
      <ng-container [ngComponentOutlet]="previewComponent()" [ngComponentOutletInputs]="{ field: field() }"></ng-container>
    </div>
  `,
  styles: ``
})
export class FormFieldComponent {
  field = input.required<FormField>();

  formService = inject(FormService);

  previewComponent = computed(() => {
    const type = this.formService.getFieldType(this.field().type);
    console.log(type, this.field());
    return type?.component ?? null;
  });
}
