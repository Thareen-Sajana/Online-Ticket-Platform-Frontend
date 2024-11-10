import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../../components/customerComponents/header/header.component';
import {FooterComponent} from '../../../components/customerComponents/footer/footer.component';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent {

}
