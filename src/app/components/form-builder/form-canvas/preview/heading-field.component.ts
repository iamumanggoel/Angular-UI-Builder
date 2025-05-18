import { Component, input } from '@angular/core';
import { FormField } from '../../../../models/form';

@Component({
  selector: 'app-heading-field',
  imports: [],
  template: `
    <div class="mb-4">
      <h2 class="text-xl">{{ field().label }}</h2>
      <p class="text-gray-500">{{ field().placeholder }}</p>
    </div>
  `,
  styles: ``
})
export class HeadingFieldComponent {
  field = input.required<FormField>();
}
