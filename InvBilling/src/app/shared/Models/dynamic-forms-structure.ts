import { ValidatorFn } from '@angular/forms';

export type ControlType = 'text' | 'number' | 'select';

export interface BaseControlConfig {
  type: ControlType;
  name: string;
  label: string;
  validators?: ValidatorFn[];
  errorMessage?: string;   // for regex or other errors
}

export interface SelectOption {
  id: number | string;
  name: string;
}

export interface SelectControlConfig extends BaseControlConfig {
  type: 'select';
  options: SelectOption[];
}

export interface TextControlConfig extends BaseControlConfig {
  type: 'text';
}

export interface NumberControlConfig extends BaseControlConfig {
  type: 'number';
}

export type FormControlConfig =
  | SelectControlConfig
  | TextControlConfig
  | NumberControlConfig;
