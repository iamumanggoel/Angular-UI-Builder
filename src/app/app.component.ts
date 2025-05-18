import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormMenuComponent } from "./components/form-builder/form-menu/form-menu.component";
import { FormCanvasComponent } from "./components/form-builder/form-canvas/form-canvas.component";
import { FormConfigComponent } from "./components/form-builder/form-config/form-config.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormMenuComponent, FormCanvasComponent, FormConfigComponent, DragDropModule, MatIconModule, MatButtonModule],
  template: `
    <div class="flex flex-col h-screen px-4" style="background-color: #f0f9ff;"> 

      <div class=" flex flex-col items-center justify-center gap-1 py-10 [view-transition-name:top-header] z-10" style="background-color: #f0f9ff;">
        <h1 class="text-2xl tracking-wide font-medium" style="color: #006591;"> Angular Form Designer </h1>
        <p class="text-gray-500"> Create beautiful, responsive forms with Angular Material and tailwindCSS </p>
      </div>
      <div class="relative flex gap-4" cdkDropListGroup>
        <app-form-menu class="w-64" />
        <app-form-canvas class="flex-1" />
        <app-form-config class="w-64" />
        <button mat-flat-button class="!absolute -top-[50px] right-0 !rounded" (click)="formService.exportForm()">
            Export Form
            <mat-icon>download</mat-icon>
        </button>
      </div>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Angular-UI-Builder';

  formService = inject(FormService);
}
