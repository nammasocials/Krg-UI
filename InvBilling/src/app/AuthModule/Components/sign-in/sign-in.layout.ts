import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupComponent } from '../../../shared/popup/popup.component';
import { UsernameGuidlinesComponent } from '../username-guidlines/username-guidlines.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,PopupComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInLayout {
  form: FormGroup;
  guideLineComponent : any = UsernameGuidlinesComponent;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^(?!\d)[a-zA-Z0-9]{5,20}$/)]],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
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
