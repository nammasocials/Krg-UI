import { Component } from '@angular/core';
import { Constant } from '../../constants';
import { VMAuthResponse } from '../../AuthModule/Models/AuthModels';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { AuthService } from '../../AuthModule/Services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  readonly Constant = Constant;

  constructor(private authService: AuthService,private router : Router,private cookieService: CookieService) {

  }
  SignOut() {
    this.authService.InitiateLogOut().subscribe({
      next: (response) => {
        this.cookieService.deleteAll('/', 'localhost');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.cookieService.deleteAll('/', 'localhost');
        this.router.navigate(['/login']);
      }
    });
  }
}
