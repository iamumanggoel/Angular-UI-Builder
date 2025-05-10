import { computed, Injectable, signal } from '@angular/core';
import { FieldTypeDefiniton, FormField, FormRow } from '../models/form';
import { TextFieldComponent } from '../components/form-builder/form-canvas/preview/text-field.component';
import { CheckboxFieldComponent } from '../components/form-builder/form-canvas/preview/checkbox-field.component';
import { SelectFieldComponent } from '../components/form-builder/form-canvas/preview/select-field.component';

const TEXT_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'text',
  icon: 'text_fields',
  label: 'Text Field',
  defaultConfigs: {
    label: 'Text Field',
    required: false
  },
  settingsConfig: [
    {
      type: 'text',
      label: 'Label',
      key: 'label'
    },
    {
      type: 'text',
      label: 'Placeholder',
      key: 'placeholder'
    },
    {
      type: 'checkbox',
      label: 'Required',
      key: 'required'
    },
    {
      type: 'select',
      label: 'Input Type',
      key: 'inputType',
      options: [
        {
          label: 'Text',
          value: 'text'
        },
        {
          label: 'Number',
          value: 'number'
        },
        {
          label: 'Password',
          value: 'password'
        },
        {
          label: 'Email',
          value: 'email'
        },
        {
          label: 'Phone',
          value: 'tel'
        }
      ]
    }
    
  ],
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
  settingsConfig: [
    {
      type: 'text',
      label: 'Label',
      key: 'label'
    },
    {
      type: 'checkbox',
      label: 'Required',
      key: 'required'
    }
  ],
  component: CheckboxFieldComponent,
}

const SELECT_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'select',
  icon: 'arrow_drop_down_circle',
  label: 'Dropdown',
  defaultConfigs: {
    label: 'Select',
    required: false,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ]
  },
  settingsConfig: [
    {
      type: 'text',
      label: 'Label',
      key: 'label'
    },
    {
      type: 'checkbox',
      label: 'Required',
      key: 'required'
    },
    {
      type: 'dynamic-options',
      key: 'options',
      label: 'Options',
    }
  ],
  component: SelectFieldComponent,
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  fieldTypes = new Map<string, FieldTypeDefiniton>([
    ['text', TEXT_FIELD_DEFINTION],
    ['checkbox', CHECKBOX_FIELD_DEFINTION],
    ['select', SELECT_FIELD_DEFINTION]
  ]);

  getFieldTypes(): FieldTypeDefiniton[] {
    return Array.from(this.fieldTypes.values());
  }
  
  getFieldType(type: string): FieldTypeDefiniton | undefined{
    return this.fieldTypes.get(type);
  }

  private _selectedFieldId = signal<string | null>(null);
  private _rows =  signal<FormRow[]>([]);

  public  readonly rows = this._rows.asReadonly();
  
  public readonly selectedField = computed(() => {
    return this._rows().flatMap(row => row.fields).find(field => field.id === this._selectedFieldId());
  });
  
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

  removeField(fieldId: string){
    const rows = this._rows();

    const newRows = rows.map(row => {
      const updatedFileds = row.fields.filter(field => field.id !== fieldId);
      return {
        ...row,
        fields: updatedFileds
      }
    });
    this._rows.set(newRows);
  }

  updateField(fieldId: string, data: Partial<FormField>){
    const rows = this._rows();
    const newRows = rows.map(row =>({
      ...row,
      fields: row.fields.map(f => f.id === fieldId ? { ...f, ...data } : f)
    }));

    this._rows.set(newRows);
  }


  setSelectedField(fieldId: string){
    this._selectedFieldId.set(fieldId);
  }
  

  addRow(){
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: []
    }

    const rows = this._rows();
    this._rows.set([...rows, newRow]);
  }
    
  removeRow(rowId: string){
    if(this._rows().length === 1){
      return;
    }

    const rows = this._rows();

    const newRows = rows.filter(row => row.id !== rowId);
    this._rows.set(newRows);
  }


  moveField(fieldId: string, src_rowId: string, dest_rowId: string, dest_index: number){
    const rows = this._rows();

    let fieldToMove: FormField | undefined;
    let src_rowIndex = -1;
    let src_fieldIndex = -1;

    rows.forEach((row, index) => {
      if(row.id === src_rowId){
        src_rowIndex = index;

        src_fieldIndex = row.fields.findIndex(field => field.id === fieldId);

        if(src_fieldIndex >= 0){
          fieldToMove = row.fields[src_fieldIndex];
        }
      }
    });

    if(!fieldToMove) return;

    const newRows = [...rows];

    const fieldWithRemoveField = newRows[src_rowIndex].fields.filter(field => field.id !== fieldId);
    newRows[src_rowIndex].fields = fieldWithRemoveField;
    
    const dest_rowIndex = newRows.findIndex(row => row.id === dest_rowId);

    if(dest_rowIndex >= 0){
      const targetFields = [...newRows[dest_rowIndex].fields];
      targetFields.splice(dest_index, 0, fieldToMove);
      newRows[dest_rowIndex].fields = targetFields;
    }
    
    this._rows.set(newRows);
  }
}
