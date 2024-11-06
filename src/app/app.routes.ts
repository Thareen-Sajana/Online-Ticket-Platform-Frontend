import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
    {"path": "home", component: HomePageComponent},
    {"path": "about-us", component: AboutUsPageComponent},
    {"path": "login", component: LoginPageComponent},
    {"path": "register", component: RegisterPageComponent}
];
