import { FormField } from "./field";

export interface FormRow {
    id: string;
    name:string
    fields: FormField[];
}