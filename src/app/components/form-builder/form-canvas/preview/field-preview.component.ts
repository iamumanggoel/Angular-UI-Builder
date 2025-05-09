import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../../models/form';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  template: `
    <ng-container [ngComponentOutlet]="previewComponent()" [ngComponentOutletInputs]="{ field: field() }"></ng-container>

  `,
  styles: ``
})
export class FieldPreviewComponent {
    field = input.required<FormField>();

    formService = inject(FormService);

    previewComponent = computed(() => {
      const type = this.formService.getFieldType(this.field().type);
      return type?.component ?? null;
    });
}
