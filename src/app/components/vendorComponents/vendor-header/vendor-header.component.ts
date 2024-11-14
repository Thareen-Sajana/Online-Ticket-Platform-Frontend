import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-vendor-header',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './vendor-header.component.html',
  styleUrl: './vendor-header.component.css'
})
export class VendorHeaderComponent {

}
