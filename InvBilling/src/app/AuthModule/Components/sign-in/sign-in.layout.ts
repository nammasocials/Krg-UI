import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupComponent } from '../../../shared/popup/popup.component';
import { GuidlinesComponent } from '../guidlines/guidlines.component';
import { AuthService } from '../../Services/auth.service';
import { VMAuthReq, VMAuthResponse } from '../../Models/AuthModels';
import { ApiResponse } from '../../../shared/Models/ApiResponse';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PopupComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInLayout {
  /////////////////////// Component Variables ///////////////////////////////////
  form: FormGroup;
  login_req: VMAuthReq = new VMAuthReq();
  login_res: VMAuthResponse = new VMAuthResponse();

  /////////////////////// Utility Variables ////////////////////////////////////
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupFooterType: 'ok' | 'confirm' | 'none' = 'ok';
  popupChild?: any;
  popupChildData: any;
  popupWidth = '35%';

  constructor(private fb: FormBuilder,
    private authService: AuthService
  ) {
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

  openChildPopup(isPassword: boolean) {
    this.popupTitle = 'Username Guidlines';
    if (isPassword) {
      this.popupTitle = 'Password Guidlines';
    }
    this.popupFooterType = 'ok';
    this.popupChild = GuidlinesComponent;
    this.popupChildData = { isPassword: isPassword };
    this.showPopup = true;
  }

  handlePopupClose(response: any) {
    console.log('Popup closed with:', response);
    this.showPopup = false;
  }

  async SignIn() {
    if (this.form.valid) {
      this.login_req.username = this.form.get('username')?.value();
      this.login_req.password = this.form.get('password')?.value();
      try {
        const response: ApiResponse<VMAuthResponse> = await this.authService.InitiateLogin(this.login_req);
        console.log('Login response:', response);
      } catch (error) {
        console.error('Login failed:', error);
      }

      // Perform login logic here
    } else {
      this.form.markAllAsTouched(); // Show errors
    }
  }
}
