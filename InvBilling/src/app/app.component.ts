import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayout } from './main-layout/main-layout.layout';
import { SignInLayout } from './AuthModule/Components/sign-in/sign-in.layout';
import { AuthService } from './AuthModule/Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainLayout,SignInLayout ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InvBilling';
  constructor(public authService: AuthService) {}
}
