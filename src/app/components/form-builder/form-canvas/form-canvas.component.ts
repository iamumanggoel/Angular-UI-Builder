import { Component } from '@angular/core';
import { StyleDirective } from '../../../directives/style.directive';
import { FormEditorComponent } from "./form-editor.component";

@Component({
  selector: 'app-form-canvas',
  imports: [
    StyleDirective,
    FormEditorComponent
],
  template: `
    <div [appStyle]="'primary-container'" class="h-[calc(100vh-150px)] overflow-y-auto">

      <div class="pb-4 border-b border-gray-200">
        <h3 class="text-xl font-medium">Form Canvas</h3>
      </div>

      <app-form-editor />
    </div>
  `,
  styles: ``
})
export class FormCanvasComponent {

}
