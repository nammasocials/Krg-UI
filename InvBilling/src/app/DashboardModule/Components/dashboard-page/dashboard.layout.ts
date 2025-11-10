import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DashboardService } from '../../Services/dashboard.service';
import { VDashboardStats } from '../../Models/CustomerModels';
import { customTableHeader, customTableOptionsEmitter, options, optionsEnum } from '../../../shared/Models/custom-table';
import { VactivityLog } from '../../Models/ActivityLog';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CustomTableComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboardlayout {
  customerDetails: VDashboardStats = new VDashboardStats();
  customerPercentage: number = 0;
  RecentActLoading: boolean = true;
  activityTitle : string = "Recent Activities";
  recentActivityOptions: options[] = [
    { label: "View", actions: optionsEnum.View, theme:"blue" },
  ]
  activityheaderData: customTableHeader[] = [
    { headerLabel: 'Type', field: 'entityType', },
    { headerLabel: 'Description', field: 'description' },
    { headerLabel: 'Options', field: 'options' },
  ];
  activityLogs: VactivityLog[] = [];

  constructor(private dashboardService: DashboardService) {
    this.fetchCustomerDetails();
  }
  fetchCustomerDetails() {
    this.dashboardService.fetchCustomerDashboardStats().subscribe(
      (data: any) => {
        if (data != undefined) {
          this.customerDetails = data.data;
          this.getCutomerPercentage();
          this.fetchRecentActivityLogs();
        }
      }
    );
  }
  fetchRecentActivityLogs() {
    this.RecentActLoading = true;
    this.dashboardService.fetchRecentActivityLogs().subscribe(
      (data: any) => {
        this.RecentActLoading = false;
        if (data != undefined) {
          this.activityLogs = data.data;
        }
      }
    );
  }
  getCutomerPercentage() {
    this.customerPercentage = this.dashboardService.getCutomerPercentage(this.customerDetails.overallCount, this.customerDetails.recentAddedCount);
    console.log(this.customerPercentage);
  }

  ActivityActions(action: customTableOptionsEmitter) {
    if (action.type === optionsEnum.View) {
      //this.ViewCustomer(action.data);
    }
  }
}
