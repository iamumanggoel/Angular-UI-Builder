import { Component, computed, inject } from '@angular/core';
import { StyleDirective } from '../../../directives/style.directive';
import { FormService } from '../../../services/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicOptionsComponent } from "./dynamic-options.component";
@Component({
  selector: 'app-form-config',
  imports: [
    StyleDirective,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    DynamicOptionsComponent
],
  template: `
    <p [appStyle]="'primary-container'" class="h-[calc(100vh-150px)] overflow-y-auto">
      @if(formService.selectedField(); as selectedField){
        <h3 class="text-xl font-medium mb-6" style="color: #006591;">Field Properties</h3>

        <div class="flex flex-col gap-6 ">
          @for (setting of fieldSettings(); track setting.key) {
            @switch (setting.type) {
              @case('text') {
                <mat-form-field class="w-full">
                  <mat-label>{{ setting.label }}</mat-label>
                  <input 
                    matInput
                    [ngModel]="fieldValues()[setting.key]"
                    (ngModelChange)="updateFieldValue(selectedField.id, setting.key, $event)"
                  />
                </mat-form-field>
              }
              @case('checkbox') {
                <div class="flex items-center">
                  <mat-checkbox [ngModel]="fieldValues()[setting.key]" (ngModelChange)="updateFieldValue(selectedField.id, setting.key, $event)">
                    {{ setting.label }}
                  </mat-checkbox>
                </div>
              }
              @case('select') {
                <mat-form-field class="w-full">
                  <mat-label>{{ setting.label }}</mat-label>
                  <mat-select [ngModel]="fieldValues()[setting.key]" (ngModelChange)="updateFieldValue(selectedField.id, setting.key, $event)">
                    @for(option of setting.options || []; track option.value){
                      <mat-option [value]="option.value">{{ option.label }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }
              @case('dynamic-options') {
                <app-dynamic-options 
                  [title]="setting.label"
                  [options]="fieldValues()[setting.key]" 
                  (optionsChange)="updateFieldValue(selectedField.id, setting.key, $event)" />
              }

            }
          }  

        </div>
      }
      @else {
        <div class="flex items-center justify-center h-full text-gray-500">
          Select a field to configure
        </div>
      }
    </p>
    
  `,
  styles: ``
})
export class FormConfigComponent {
  formService = inject(FormService);

  fieldSettings = computed(() => {
    const field = this.formService.selectedField();
    if(!field) return [];

    const fieldDef = this.formService.getFieldType(field.type);
    return fieldDef?.settingsConfig ?? [];
  });


  fieldValues = computed(() => {
    const field = this.formService.selectedField();
    if(!field) return {};

    return field as any;
  });

  updateFieldValue(fieldId: string, key: string, value: any){
    this.formService.updateField(fieldId, { [key]: value });
  }
}
