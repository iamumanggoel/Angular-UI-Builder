import { Component } from '@angular/core';
import { StyleDirective } from '../../../directives/style.directive';

@Component({
  selector: 'app-form-config',
  imports: [
    StyleDirective,
  ],
  template: `
    <p [appStyle]="'primary-container'" class="h-[calc(100vh-150px)] overflow-y-auto">
      form-config works!
    </p>
  `,
  styles: ``
})
export class FormConfigComponent {

}
