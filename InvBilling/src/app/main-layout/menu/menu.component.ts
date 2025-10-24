import { Component } from '@angular/core';
import { Constant } from '../../constants';
import { AuthService } from '../../AuthModule/Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  readonly Constant = Constant;
  isMobileOpen = false;

  constructor(private authService: AuthService,private router : Router,private cookieService: CookieService) {

  }
    

  toggleMobileMenu() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobileMenu() {
    this.isMobileOpen = false;
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
