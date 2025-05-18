import { Component, inject } from '@angular/core';
import { StyleDirective } from '../../../directives/style.directive';
import { FormService } from '../../../services/form.service';
import { ButtonComponent } from "./button.component";
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-form-menu',
  imports: [
    StyleDirective,
    ButtonComponent,
    DragDropModule
],
  template: `
    <div [appStyle]="'primary-container'" class="h-[calc(100vh-150px)] overflow-y-auto">

      <h3 class="text-xl font-medium mb-4" style="color: #006591;">Form Elements</h3>
      <div 
        cdkDropList
        [cdkDropListSortingDisabled]="'true'"
        [cdkDropListData]="'form-menu-selector'"
        [cdkDropListEnterPredicate]="noDropAllowed"
        class="flex flex-col gap-4 elements-menu">
        @for(type of formService.getFieldTypes(); track type.type){
          <app-button [field]="type" />
        }
      </div>
    </div>
  `,
  styles: ``
})
export class FormMenuComponent {
  formService = inject(FormService);

  noDropAllowed(drag: CdkDrag<any>, drop: CdkDropList<any>): boolean {
    return false;
  }
}
