import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/customerPage/home-page/home-page.component';
import { AboutUsPageComponent } from './pages/customerPage/about-us-page/about-us-page.component';
import { LoginPageComponent } from './pages/customerPage/login-page/login-page.component';
import { RegisterPageComponent } from './pages/customerPage/register-page/register-page.component';
import {BuyNowPageComponent} from './pages/customerPage/buy-now-page/buy-now-page.component';
import {BuyTicketDitailsPageComponent} from './pages/customerPage/buy-ticket-ditails-page/buy-ticket-ditails-page.component';
import {TicketHistoryPageComponent} from './pages/customerPage/ticket-history-page/ticket-history-page.component';
import {CustomerPageComponent} from './pages/customerPage/customer-page/customer-page.component';
import {VendorPageComponent} from './pages/vendorPage/vendor-page/vendor-page.component';
import {CreateSessionComponent} from './pages/vendorPage/create-session/create-session.component';
import {ManageSessionComponent} from './pages/vendorPage/manage-session/manage-session.component';

export const routes: Routes = [
    {"path": "login", component: LoginPageComponent},
    {"path": "register", component: RegisterPageComponent},
    {"path": 'ticket-details', component: BuyTicketDitailsPageComponent},

    {"path": 'customer', component: CustomerPageComponent,
      children: [
        {"path": 'home', component: HomePageComponent},
        {"path": 'ticket-history', component: TicketHistoryPageComponent},
        {"path": 'buy-now', component: BuyNowPageComponent},
        {"path": 'about-us', component: AboutUsPageComponent},
        {"path": 'ticket-history-page', component: TicketHistoryPageComponent},
        {"path": '', redirectTo: 'home', pathMatch: 'full'}
      ]},

    {"path": 'vendor', component: VendorPageComponent,
      children: [
        {"path": 'create-session', component: CreateSessionComponent},
        {"path": 'manage-session', component: ManageSessionComponent},
        {"path": '', redirectTo: 'create-session', pathMatch: 'full'}
      ]},
];
