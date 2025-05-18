import { Component, input } from '@angular/core';
import { FormField } from '../../../../models/form';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-group-field',
  imports: [
    NgClass,
    MatButtonModule
  ],
  template: `
    <div class="flex gap-2" [ngClass]="field().alignment =='start' ? 'justify-start' : 'justify-end'">
      <button mat-flat-button>{{ field().text }}</button>
      <button mat-button>Cancel</button>
    </div>
  `,
  styles: `
    
  `
})
export class ButtonGroupFieldComponent {

  field = input.required<FormField>(); 
}
