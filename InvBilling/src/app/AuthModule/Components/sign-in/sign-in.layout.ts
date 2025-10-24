import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { VMAuthReq, VMAuthResponse } from '../../Models/AuthModels';
import { ApiResponse } from '../../../shared/Models/ApiResponse';
import { PopupService } from '../../../shared/Service/popup.service';
import { Router } from '@angular/router';
import { Constant } from '../../../constants';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInLayout {
  /////////////////////// Component Variables ///////////////////////////////////
  form: FormGroup;
  login_req: VMAuthReq = new VMAuthReq();
  login_res: VMAuthResponse = new VMAuthResponse();
  readonly Constant = Constant;

  constructor(private fb: FormBuilder, private router : Router,
    private authService: AuthService,private popupService: PopupService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^(?!\d)[a-zA-Z0-9]{5,20}$/)]],
      password: ['', [Validators.required,   Validators.pattern(/^(?=(?:.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]){2,})(?=(?:.*\d){2,})(?=(?:.*[a-z]){2,})(?=(?:.*[A-Z]){2,}).{7,20}$/) ]]
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
  // openChildPopup(isPassword: boolean) {
  //   if (isPassword) {
  //     this.popupService.openComponentPopup(GuidlinesComponent, { isPassword: true }, 'Password Guidelines', 'ok');
  //   }
  //   else{
  //     this.popupService.openComponentPopup(GuidlinesComponent, { isPassword: false }, 'Username Guidelines', 'ok');
  //   }
  // }

  async SignIn() {
    if (this.form.valid) {
      this.login_req.username = this.form.get('username')?.value;
      this.login_req.password = this.form.get('password')?.value;
      try {
        const response: ApiResponse<VMAuthResponse> = await this.authService.InitiateLogIn(this.login_req);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Login failed:', error);
      }

      // Perform login logic here
    } else {
      this.form.markAllAsTouched(); // Show errors
    }
  }
}
