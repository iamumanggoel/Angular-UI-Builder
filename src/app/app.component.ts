import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormMenuComponent } from "./components/form-builder/form-menu/form-menu.component";
import { FormCanvasComponent } from "./components/form-builder/form-canvas/form-canvas.component";
import { FormConfigComponent } from "./components/form-builder/form-config/form-config.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormMenuComponent, FormCanvasComponent, FormConfigComponent, DragDropModule],
  template: `
    <div class="flex flex-col h-screen bg-gray-100 px-4">

      <div class="flex flex-col items-center justify-center gap-1 py-10">
        <h1 class="text-2xl tracking-wide font-medium"> Angular Form Designer </h1>
        <p class="text-gray-500"> Create beautiful, responsive forms with Angular Material and tailwindCSS </p>
      </div>
      <div class="flex gap-4" cdkDropListGroup>
        <app-form-menu class="w-64" />
        <app-form-canvas class="flex-1" />
        <app-form-config class="w-64" />
      </div>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Angular-UI-Builder';
}
