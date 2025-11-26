import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlConfig } from '../../Models/dynamic-forms-structure';

@Component({
  selector: 'app-dynamic-multi-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-multi-form.component.html',
  styleUrls: ['./dynamic-multi-form.component.css']
})
export class DynamicMultiFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<{ data: any; valid: boolean }>();
  @Output() rowCountChange = new EventEmitter<number>();
  @Output() invalidRowCountChange = new EventEmitter<number>();
  @Input() title: string = 'Dynamic Multi Form';
  @Input() controls: FormControlConfig[] = [];
  @Output() valueChange = new EventEmitter();

  parentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clearAll();
    this.formArray.valueChanges.subscribe(() => this.emitChanges());
  }

  clearAll() {
    this.parentForm = this.fb.group({
      formArray: this.fb.array([])
    });
    this.addRow(); // create first row
  }

  get formArray(): FormArray {
    return this.parentForm.get('formArray') as FormArray;
  }

  createRow(): FormGroup {
    const group: any = {};
    this.controls.forEach(c => {
      group[c.name] = this.fb.control('', c.validators || []);
    });
    return this.fb.group(group);
  }

  addRow() {
    this.formArray.push(this.createRow());
    this.emitChanges();
  }

  removeRow(index: number) {
    this.formArray.removeAt(index);
    this.emitChanges();
  }

  emitChanges() {
    const rows = this.formArray.length;

    const invalidRows = this.formArray.controls.filter(row => row.invalid).length;

    this.rowCountChange.emit(rows);
    this.invalidRowCountChange.emit(invalidRows);
    this.valueChange.emit({
      form: this.formArray,         // or index, or unique id
      value: this.formArray.value
    });

  }
  isRequired(c: FormControlConfig): boolean {
    return !!c.validators?.some(v => v === Validators.required);
  }
  getFormState() {
    this.parentForm.markAllAsTouched();
    this.parentForm.updateValueAndValidity();

    return {
      data: this.parentForm.getRawValue(),
      valid: this.parentForm.valid
    };
  }
}
