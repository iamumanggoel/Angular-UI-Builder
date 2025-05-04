import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../models/form';
import { FormService } from '../../../services/form.service';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-form-field',
  imports: [
    NgComponentOutlet,
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="bg-white p-4 pt-1 rounded-lg shadow-sm border border-gray-200 hover:border-black cursor-pointer"> 
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm">{{ field().type | titlecase }}</span>
        <button mat-icon-button (click)="removeField($event)">
          <mat-icon class="-mr-2">delete</mat-icon>
        </button>
      </div>

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

  removeField(e: Event){
    e.stopPropagation();
    this.formService.removeField(this.field().id);
  }
}
