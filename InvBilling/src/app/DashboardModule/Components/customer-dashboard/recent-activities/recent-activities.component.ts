import { Component } from '@angular/core';
import { CustomTableComponent } from '../../../../shared/Components/custom-table/custom-table.component';
import { customTableHeader, customTableOptionsEmitter, options, optionsEnum } from '../../../../shared/Models/custom-table';
import { VactivityLog } from '../../../Models/ActivityLog';
import { DashboardService } from '../../../Services/dashboard.service';
import { CommonModule } from '@angular/common';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [CustomTableComponent, CommonModule],
  templateUrl: './recent-activities.component.html',
  styleUrl: './recent-activities.component.css'
})
export class RecentActivitiesComponent {

  RecentActLoading: boolean = true;
  activityTitle: string = "Recent Activities";
  recentActivityOptions: options[] = [
    { label: "View", actions: optionsEnum.View, theme: "blue" },
  ]
  activityheaderData: customTableHeader[] = [
    { headerLabel: 'Type', field: 'entityType', },
    { headerLabel: 'Description', field: 'description' },
    { headerLabel: 'Options', field: 'options' },
  ];
  activityLogs: VactivityLog[] = [];

  constructor(private dashboardService: DashboardService) {
    this.fetchRecentActivityLogs();
  }
  fetchRecentActivityLogs() {
    this.RecentActLoading = true;
    timer(1000)
      .pipe(switchMap(() => this.dashboardService.fetchRecentActivityLogs()))
      .subscribe({
        next: (response) => {
          this.activityLogs = response.data;
          this.RecentActLoading = false;
        },
      });
  }
  ActivityActions(action: customTableOptionsEmitter) {
    if (action.type === optionsEnum.View) {
      //this.ViewCustomer(action.data);
    }
  }
}
