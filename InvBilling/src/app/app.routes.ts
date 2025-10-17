import { Routes } from '@angular/router';
import { SignInLayout } from './AuthModule/Components/sign-in/sign-in.layout';
import { Dashboardlayout } from './DashboardModule/Components/dashboard-page/dashboard.layout';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route
    { path: 'login', component: SignInLayout },
    { path: 'dashboard', component: Dashboardlayout },
];
