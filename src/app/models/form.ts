import { Type } from "@angular/core";


export interface FieldTypeDefiniton{
    type: string;
    icon: string;
    label: string;
    defaultConfigs: any;
    settingsConfig: FieldSettingDefintion[];
    component: Type<unknown>;
    generateCode: (field: FormField) => string;
}


export interface FieldSettingDefintion {
    type: 'text' | 'checkbox' | 'select' | 'dynamic-options';
    label: string;
    key: string;
    options?: OptionItem[];
}

export interface OptionItem {
    label: string;
    value: string;
}

export interface FormField {
    id: string;
    type: string;
    label: string;
    required: boolean;
    inputType?: string;
    placeholder?: string;
    options?: OptionItem[];
}

export interface FormRow {
    id: string;
    fields: FormField[];
}