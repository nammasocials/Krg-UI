import { Routes } from '@angular/router';
import { SignInLayout } from './AuthModule/Components/sign-in/sign-in.layout';
import { Dashboardlayout } from './DashboardModule/Components/dashboard-page/dashboard.layout';
import { MainLayout } from './main-layout/main-layout.layout';
import { AuthGuard } from './AuthModule/Services/auth.guard';
import { ProductListComponent } from './ProductModule/Components/product-list/product-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route
    { path: 'login', component: SignInLayout },
    { 
    path: '', 
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: Dashboardlayout },
        { path: 'product', component: ProductListComponent },
    //   { path: 'customer', component: CustomerComponent },
    //   { path: 'invoice', component: InvoiceComponent },
    ]
  }
];
