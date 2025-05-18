import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormField } from '../../../../models/form';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-area-field',
  imports: [MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field class="w-full">
      <mat-label> {{ field().label }} </mat-label>
      <textarea 
        matInput 
        [placeholder]="field().placeholder || ''"
        [required]="field().required"
      ></textarea>
    </mat-form-field>
  `,
  styles: ``
})
export class TextAreaFieldComponent {
  field = input.required<FormField>();
}
