import { Validators } from "@angular/forms";
import { FormControlConfig } from "../../shared/Models/dynamic-forms-structure";

export const FORM_CONTROLS_CONFIG: FormControlConfig[] = [
  {
    type: 'select',
    name: 'productCode',
    label: 'Product',
    options: [
    ],
    validators: [Validators.required],
    errorMessage : "Please select product for invoice"
  },
  {
    type: 'number',
    name: 'quantity',
    label: 'Quantity',
    validators: [
      Validators.required,
      Validators.min(1)
    ],
    errorMessage : "Invalid Quantity / exceeds available stock"
  },
  {
    type: 'text',
    name: 'remarks',
    label: 'Remarks',
    validators: [
      Validators.pattern(/^[A-Za-z0-9 ]+$/)
    ],
    errorMessage: 'Only alphanumeric values allowed'
  }
];