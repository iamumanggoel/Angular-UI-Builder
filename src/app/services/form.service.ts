import { Injectable, signal } from '@angular/core';
import { FieldTypeDefiniton, FormField, FormRow } from '../models/form';
import { TextFieldComponent } from '../components/form-builder/form-canvas/preview-form-fields/text-field.component';
import { CheckboxFieldComponent } from '../components/form-builder/form-canvas/preview-form-fields/checkbox-field.component';

const TEXT_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'text',
  icon: 'text_fields',
  label: 'Text Field',
  defaultConfigs: {
    label: 'Text Field',
    required: false
  },
  component: TextFieldComponent,
}

const CHECKBOX_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'checkbox',
  icon: 'check_box',
  label: 'Checkbox',
  defaultConfigs: {
    label: 'Checkbox Field',
    required: false
  },
  component: CheckboxFieldComponent,
}


@Injectable({
  providedIn: 'root'
})
export class FormService {

  fieldTypes = new Map<string, FieldTypeDefiniton>([
    ['text', TEXT_FIELD_DEFINTION],
    ['checkbox', CHECKBOX_FIELD_DEFINTION]
  ]);

  getFieldTypes(): FieldTypeDefiniton[] {
    return Array.from(this.fieldTypes.values());
  }
  
  getFieldType(type: string): FieldTypeDefiniton | undefined{
    return this.fieldTypes.get(type);
  }

  private _rows =  signal<FormRow[]>([]);
  public  readonly rows = this._rows.asReadonly();

  
  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        fields: []
      }
    ])
  }

  addFormField(field: FormField, rowId: string, index?: number){
    const rows = this._rows();

    const newRows = rows.map(row => {
      if(row.id === rowId){
        const updatedFileds = [...row.fields];
        if(index === undefined){
          updatedFileds.push(field);
        }else{
          updatedFileds.splice(index, 0, field);
        }
        return {
          ...row,
          fields: updatedFileds
        }
      }
      return row;
    });

    this._rows.set(newRows);
  }

}
