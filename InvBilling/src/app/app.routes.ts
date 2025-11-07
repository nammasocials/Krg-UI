import { Routes } from '@angular/router';
import { SignInLayout } from './AuthModule/Components/sign-in/sign-in.layout';
import { Dashboardlayout } from './DashboardModule/Components/dashboard-page/dashboard.layout';
import { MainLayout } from './main-layout/main-layout.layout';
import { AuthGuard } from './AuthModule/Services/auth.guard';
import { ProductListComponent } from './ProductModule/Components/product-list/product-list.component';
import { CustomerListComponent } from './CustomerModule/Components/customer-list/customer-list.component';
import { InvoiceListComponent } from './InvoiceModule/Components/invoice-list/invoice-list.component';
import { CustomerDetailsComponent } from './CustomerModule/Components/customer-details/customer-details.component';

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

      // Customer routes
      { path: 'customer', component: CustomerListComponent }, // List page
      { path: 'customer/:id', component: CustomerDetailsComponent }, // Detail pa

      // Product routes
      { path: 'product', component: ProductListComponent },

      // Invoice routes
      { path: 'invoice', component: InvoiceListComponent },
    ]
  }
];
