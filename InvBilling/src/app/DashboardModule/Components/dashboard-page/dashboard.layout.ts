import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DashboardService } from '../../Services/dashboard.service';
import { VDashboardStats } from '../../Models/CustomerModels';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboardlayout {
  customerDetails: VDashboardStats = new VDashboardStats();
  customerPercentage : number = 0;

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
  getCutomerPercentage(){
    this.customerPercentage = this.dashboardService.getCutomerPercentage(this.customerDetails.overallCount, this.customerDetails.recentAddedCount);
    console.log(this.customerPercentage);
  }
}
