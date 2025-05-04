import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FieldTypeDefiniton, FormField } from '../../../models/form';
import { FormFieldComponent } from "./form-field.component";

@Component({
  selector: 'app-form-editor',
  imports: [
    DragDropModule,
    FormFieldComponent
],
  template: `
    <div class="p-4">
      @for(row of formService.rows(); track row.id){
        <div 
          cdkDropList
          (cdkDropListDropped)="drop($event, row.id)"
          [cdkDropListOrientation]="'mixed'"
          class="p-5 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <div>Row</div>
            <div class="flex gap-4 flex-wrap">
              @for(field of row.fields; track field.id){
                <app-form-field class="flex-1"[field]="field" />
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
  }
}
