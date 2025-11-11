import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DashboardService } from '../../Services/dashboard.service';
import { VDashboardStats } from '../../Models/CustomerModels';
import { CommonModule } from '@angular/common';
import { RecentActivitiesComponent } from '../customer-dashboard/recent-activities/recent-activities.component';
import { TopCustomersComponent } from '../customer-dashboard/top-customers/top-customers.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule,RecentActivitiesComponent,TopCustomersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboardlayout {
  customerDetails: VDashboardStats = new VDashboardStats();
  customerPercentage: number = 0;
  

  constructor(private dashboardService: DashboardService) {
    this.fetchCustomerDetails();
  }
  fetchCustomerDetails() {
    this.dashboardService.fetchCustomerDashboardStats().subscribe(
      (data: any) => {
        if (data != undefined) {
          this.customerDetails = data.data;
          this.getCutomerPercentage();
        }
      }
    );
  }
  getCutomerPercentage() {
    this.customerPercentage = this.dashboardService.getCutomerPercentage(this.customerDetails.overallCount, this.customerDetails.recentAddedCount);
    console.log(this.customerPercentage);
  }
}
