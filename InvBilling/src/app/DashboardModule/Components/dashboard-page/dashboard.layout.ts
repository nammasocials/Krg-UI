import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboardlayout {
  constructor(private dashboardService : DashboardService){

  }
}
