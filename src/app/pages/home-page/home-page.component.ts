import { Component } from '@angular/core';
import { BannerBodyComponent } from '../../components/banner-body/banner-body.component';
import { HomePageDescriptionComponent } from '../../components/home-page-description/home-page-description.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BannerBodyComponent, HomePageDescriptionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
