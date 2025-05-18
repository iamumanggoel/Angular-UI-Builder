import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';
import { FieldTypeDefiniton, FormField, FormRow } from '../models/form';
import { TextFieldComponent } from '../components/form-builder/form-canvas/preview/text-field.component';
import { CheckboxFieldComponent } from '../components/form-builder/form-canvas/preview/checkbox-field.component';
import { SelectFieldComponent } from '../components/form-builder/form-canvas/preview/select-field.component';
import { startViewTransition } from '../utils/view-transition';
import { DateFieldComponent } from '../components/form-builder/form-canvas/preview/date-field.component';
import { HeadingFieldComponent } from '../components/form-builder/form-canvas/preview/heading-field.component';
import { ButtonGroupFieldComponent } from '../components/form-builder/form-canvas/preview/button-group-field.component';
import { TextAreaFieldComponent } from '../components/form-builder/form-canvas/preview/text-area-field.component';

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
  generateCode: (field) => `
     <mat-form-field class="w-full">
      <mat-label> {{ ${field.label} }} </mat-label>  
      <input 
        matInput 
        [type]="${field.inputType || 'text'}"  
        [required]="${field.required}"
        [placeholder]="${field.placeholder || ''}" 
      />
    </mat-form-field>
  `
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
  generateCode: (field) => `
     <mat-checkbox [required]="${field.required}">  
      {{ ${field.label }}  
    </mat-checkbox>
  `

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
  generateCode: (field) => {
    let code = 
      `<mat-form-field class="w-full">\n` +
      `  <mat-label> {{ ${field.label} }} </mat-label>\n` +
      `  <mat-select [required]="${field.required}">\n`;

      if(field.options){
        field.options.forEach(option => {
          code += `    <mat-option [value]="${option.value}">${option.label}</mat-option>\n`;
        });
      }
      else{
        code += `    <mat-option value="option1">Option 1</mat-option>\n`;
        code += `    <mat-option value="option2">Option 2</mat-option>\n`;
        code += `    <mat-option value="option3">Option 3</mat-option>\n`;
      }
      code += `  </mat-select>\n`;
      code += `</mat-form-field>\n`;
      return code;
  
  }
}


const DATE_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'date',
  label: 'Date Picker',
  icon: 'calendar_today',
  component: DateFieldComponent,
  defaultConfigs: {
    label: 'Date',
    required: false
  },
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'checkbox', label: 'Required', key: 'required' },
  ],
  generateCode: (field) => 
    `<mat-form-field class="w-full">\n` +
        `<mat-label>{{ ${field.label} }}</mat-label>\n` +
        `<input matInput [matDatepicker]="picker${field.id}" [required]="${field.required}" [placeholder]="${field.placeholder} || ''" />\n` +
        `<mat-datepicker-toggle matIconSuffix [for]="picker${field.id}"></mat-datepicker-toggle>\n` +
        `<mat-datepicker #picker${field.id} ></mat-datepicker>\n` +
      `</mat-form-field>`

}


const HEADING_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'heading',
  label: 'Heading',
  icon: 'title',
  component: HeadingFieldComponent,
  defaultConfigs: {
    label: 'Heading',
    placeholder: 'Heading Placeholder'
  },
  settingsConfig: [
    { type: 'text', label: 'Heading', key: 'label' },
    { type: 'text', label: 'Subheading', key: 'placeholder' }
  ],
  generateCode: (field) => 
    `<div class="mb-4">\n` +
      `<h2 class="text-xl">{{ ${field.label} }}</h2>\n` +
      `<p class="text-gray-500">{{ ${field.placeholder} }}</p>\n` +
    `</div>`
}

const BUTTON_GROUP_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'button-group',
  icon: 'smart_button',
  label: 'Button Group',
  defaultConfigs: {
    text: 'Submit',
    alignment: 'end'
  },
  settingsConfig: [
    { type: 'text', label: 'Text', key: 'text' },
    { type: 'select', label: 'Alignment', key: 'alignment', options: [
      { label: 'Start', value: 'start' },
      { label: 'End', value: 'end' }
    ]}
  ],
  component: ButtonGroupFieldComponent,
  generateCode: (field) => 
    `<div class="flex gap-2" [ngClass]="${field.alignment} =='start' ? 'justify-start' : 'justify-end'">\n` +
      `<button mat-flat-button>{{ ${field.text} }}</button>\n` +
      `<button mat-button>Cancel</button>\n` +
    `</div>`
}


const TEXT_AREA_FIELD_DEFINTION: FieldTypeDefiniton = {
  type: 'text-area',
  icon: 'text_fields',
  label: 'Text Area',
  defaultConfigs: {
    label: 'Text Area',
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
    }
  ],
  component: TextAreaFieldComponent,
  generateCode: (field) => 
    `<mat-form-field class="w-full">\n` +
      `<mat-label> {{ ${field.label} }} </mat-label>\n` +
      `<textarea matInput [placeholder]="${field.placeholder || ''}" [required]="${field.required}"></textarea>\n` +
    `</mat-form-field>`
}
@Injectable({
  providedIn: 'root'
})
export class FormService {

  fieldTypes = new Map<string, FieldTypeDefiniton>([
    ['text', TEXT_FIELD_DEFINTION],
    ['checkbox', CHECKBOX_FIELD_DEFINTION],
    ['select', SELECT_FIELD_DEFINTION],
    ['date', DATE_FIELD_DEFINTION],
    ['heading', HEADING_FIELD_DEFINTION],
    ['button-group', BUTTON_GROUP_FIELD_DEFINTION],
    ['text-area', TEXT_AREA_FIELD_DEFINTION]
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

  private appRef = inject(ApplicationRef);
  
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

    startViewTransition(() => {
      this._rows.set(newRows);
    });
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
    startViewTransition(() => {
      this._rows.set(newRows);
      this.appRef.tick(); //Force change detection

    });
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

    startViewTransition(() => {
      this._rows.set([...rows, newRow]);
    });
  }
    
  removeRow(rowId: string){
    if(this._rows().length === 1){
      return;
    }

    const rows = this._rows();

    const newRows = rows.filter(row => row.id !== rowId);
    startViewTransition(() => {
      this._rows.set(newRows);
      this.appRef.tick(); //Force change detection

    });
  }


  moveRowUp(rowId: string){
    const rows = this._rows();
    const rowIndex = rows.findIndex(row => row.id === rowId);

    if(rowIndex <= 0) return;

    const newRows = [...rows];
    const temp = newRows[rowIndex - 1];
    newRows[rowIndex - 1] = newRows[rowIndex];
    newRows[rowIndex] = temp;
    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  moveRowDown(rowId: string){
    const rows = this._rows();
    const rowIndex = rows.findIndex(row => row.id === rowId);

    if(rowIndex >= rows.length - 1) return;

    const newRows = [...rows];
    const temp = newRows[rowIndex + 1];
    newRows[rowIndex + 1] = newRows[rowIndex];
    newRows[rowIndex] = temp;
    startViewTransition(() => {
      this._rows.set(newRows);
    });

  }


  moveField(fieldId: string, src_rowId: string, dest_rowId: string, dest_index: number){
    startViewTransition(() => {
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
      this.appRef.tick(); //Force change detection

    });
  }

  //Export related functionality

  exportForm(){
    const formCode = this.generateFormCode();
    const blob = new Blob([formCode], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form.ts';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  generateFormCode(): string {
    let code = this.generateImports();
    code += this.generateComponentDectorator();
    code += `template: \`\n`;
    code += `<form class="flex flex-col gap-4">\n`;

    for(const row of this._rows()){
      if(row.fields.length > 0){
        code += `  <div class="flex gap-4 flex-wrap">\n`;
        for(const field of row.fields){
          code += `    <div class="flex-1">\n`;
          code += this.generateFieldCode(field);
          code += `    </div>\n`;
        }
        code += `  </div>\n`;
      }
    }

    code += `</form>\n`;
    code += `\`\n`;
    code += `})\n`;
    code += `export class GeneratedFormComponent {\n`;
    code += `}\n`;

    return code;
  }

  generateImports(): string {
    return (
      `import { Component } from '@angular/core';\n` +
      `import { CommonModule } from '@angular/common';\n` +
      `import { FormsModule, ReactiveFormsModule } from '@angular/forms';\n` +
      `import { MatFormFieldModule } from '@angular/material/form-field';\n` +
      `import { MatInput } from '@angular/material/input';\n` +
      `import { MatSelectModule } from '@angular/material/select';\n` +
      `import { MatCheckboxModule } from '@angular/material/checkbox';\n` +
      `import { MatRadioModule } from '@angular/material/radio';\n` +
      `import { MatButtonModule } from '@angular/material/button';\n` +
      `import { MatIconModule } from '@angular/material/icon';\n` +
      `import { MatDividerModule } from '@angular/material/divider';\n` +
      `import { MatDatepickerModule } from '@angular/material/datepicker';\n` +
      `import { MatNativeDateModule } from '@angular/material/core';\n`
    );
  }

  generateComponentDectorator(): string {
    return (
      `@Component({\n` +
      `  selector: 'app-generated-form',\n` +
      `  standalone: true,\n` + 
      `  imports: [\n` +
      `    CommonModule,\n` +
      `    FormsModule,\n` +
      `    ReactiveFormsModule,\n` +
      `    MatFormFieldModule,\n` +
      `    MatInput,\n` +
      `    MatSelectModule,\n` +
      `    MatCheckboxModule,\n` +
      `    MatRadioModule,\n` +
      `    MatButtonModule,\n` +
      `    MatIconModule,\n` +
      `    MatDividerModule,\n` +
      `    MatDatepickerModule,\n` +
      `    MatNativeDateModule\n` +
      `  ],\n`
    );
  }

  generateFieldCode(field: FormField): string {
    const fieldType = this.getFieldType(field.type);
    return fieldType?.generateCode(field) || '';
  }

}
