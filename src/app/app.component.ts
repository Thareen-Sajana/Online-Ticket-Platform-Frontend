import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/customerComponents/header/header.component';
import { HomePageComponent } from './pages/customerPage/home-page/home-page.component';
import { FooterComponent } from './components/customerComponents/footer/footer.component';
import { AboutUsPageComponent } from './pages/customerPage/about-us-page/about-us-page.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomePageComponent, FooterComponent, AboutUsPageComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isAvailable:boolean = true;
  isLoggedIn:boolean = true;
}
