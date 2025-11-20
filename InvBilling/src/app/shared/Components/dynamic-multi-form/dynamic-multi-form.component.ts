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
  @Input() title: string = 'Dynamic Multi Form';
  @Input() controls: FormControlConfig[] = [];
  @Output() valueChange = new EventEmitter();

  parentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
    this.valueChange.emit(this.formArray.value);
  }
}
