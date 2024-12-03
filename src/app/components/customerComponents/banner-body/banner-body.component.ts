import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-banner-body',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './banner-body.component.html',
  styleUrl: './banner-body.component.css'
})
export class BannerBodyComponent {

}
