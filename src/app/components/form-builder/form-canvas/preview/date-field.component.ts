import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../../models/form';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-field',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <input matInput [matDatepicker]="picker" [required]="field().required" [placeholder]="field().placeholder || ''" />
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styles: ``
})
export class DateFieldComponent {

  field = input.required<FormField>();
}
