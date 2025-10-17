import { Routes } from '@angular/router';
import { SignInLayout } from './AuthModule/Components/sign-in/sign-in.layout';
import { Dashboardlayout } from './DashboardModule/Components/dashboard-page/dashboard.layout';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' }, // default route
    { path: 'signin', component: SignInLayout },
    { path: 'dashboard', component: Dashboardlayout },
];
