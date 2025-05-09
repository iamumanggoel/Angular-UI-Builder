import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FieldTypeDefiniton, FormField } from '../../../models/form';
import { FormFieldComponent } from "./form-field.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-editor',
  imports: [
    DragDropModule,
    FormFieldComponent,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
],
  template: `
    <div class="p-4">
      @for(row of formService.rows(); track row.id){
        <div 
          cdkDropList
          (cdkDropListDropped)="drop($event, row.id)"
          [cdkDropListOrientation]="'mixed'"
          class="p-5 mb-4 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <div class="flex justify-between items-center">
              <span> Row </span>
              <button mat-icon-button (click)="formService.removeRow(row.id)">
                <mat-icon>close</mat-icon>
              </button>

            </div>
            <div class="flex gap-4 flex-wrap">
              @for(field of row.fields; track field.id){
                <app-form-field cdkDrag [cdkDragData]="field" class="flex-1"[field]="field" />
              } @empty {
                <div class="w-full p-4 border border-dashed border-primary-container rounded-lg text-gray-500 text-center">
                  Drag and drop form elements here
                </div>
              }
            </div>
        </div>
      }
    </div>
  `,
  styles: ``
})
export class FormEditorComponent {

  formService = inject(FormService);

  drop(event: CdkDragDrop<string>, rowId: string): void {
    if(event.previousContainer.data === 'form-menu-selector'){
      const fieldTypeDef = event.item.data as FieldTypeDefiniton;
      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldTypeDef.type,
        ...fieldTypeDef.defaultConfigs
      }
      this.formService.addFormField(newField, rowId, event.currentIndex);
      return;
    }

    const dragData = event.item.data as FormField;
    
    //this.formService.moveField(dragData.id, event.previousContainer.data, rowId, event.currentIndex);
  }
}
