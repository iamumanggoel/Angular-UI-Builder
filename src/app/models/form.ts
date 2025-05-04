import { Type } from "@angular/core";


export interface FieldTypeDefiniton{
    type: string;
    icon: string;
    label: string;
    defaultConfigs: any;
    component: Type<unknown>;
}

export interface FormField {
    id: string;
    type: string;
    label: string;
    required: boolean;
    inputType?: string;
}

export interface FormRow {
    id: string;
    fields: FormField[];
}