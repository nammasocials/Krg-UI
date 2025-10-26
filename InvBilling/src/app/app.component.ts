import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayout } from './main-layout/main-layout.layout';
import { SignInLayout } from './AuthModule/Components/sign-in/sign-in.layout';
import { AuthService } from './AuthModule/Services/auth.service';
import { PopupService } from './shared/Service/popup.service'
import { PopupComponent } from './shared/Components/popup/popup.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './shared/Components/loading-spinner/loading-spinner.component';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,PopupComponent,LoadingSpinnerComponent,NgxSonnerToaster ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InvBilling';
  constructor(public authService: AuthService,public popupService: PopupService) {}
}
