export interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "textarea";
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}
