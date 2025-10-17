import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupComponent } from '../../../shared/popup/popup.component';
import { GuidlinesComponent } from '../guidlines/guidlines.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,PopupComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInLayout {
  form: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupFooterType: 'ok' | 'confirm' | 'none' = 'ok';
  popupChild?: any;
  popupChildData: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^(?!\d)[a-zA-Z0-9]{5,20}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?!\d)[a-zA-Z0-9]{5,20}$/)]]
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }


  openSimplePopup() {
    this.popupTitle = 'Info';
    this.popupMessage = 'This is a simple popup with OK button.';
    this.popupFooterType = 'ok';
    this.popupChild = undefined;
    this.showPopup = true;
  }

  openConfirmPopup() {
    this.popupTitle = 'Confirmation';
    this.popupMessage = 'Are you sure you want to proceed?';
    this.popupFooterType = 'confirm';
    this.popupChild = undefined;
    this.showPopup = true;
  }
  openChildPopup(isPassword : boolean) {
    this.popupTitle = 'Username Guidlines';
    if(isPassword){
      this.popupTitle = 'Password Guidlines';
    }
    this.popupFooterType = 'confirm';
    this.popupChild = GuidlinesComponent;
    this.popupChildData = { isPassword: isPassword };
    this.showPopup = true;
  }

  handlePopupClose(response: any) {
    console.log('Popup closed with:', response);
    this.showPopup = false;
  }

  SignIn(){
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      // Perform login logic here
    } else {
      this.form.markAllAsTouched(); // Show errors
    }
  }
}
