import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {VendorHeaderComponent} from '../../../components/vendorComponents/vendor-header/vendor-header.component';
import {FooterComponent} from '../../../components/customerComponents/footer/footer.component';


@Component({
  selector: 'app-vendor-page',
  standalone: true,
  imports: [RouterOutlet, VendorHeaderComponent, FooterComponent],
  templateUrl: './vendor-page.component.html',
  styleUrl: './vendor-page.component.css'
})
export class VendorPageComponent {

}
