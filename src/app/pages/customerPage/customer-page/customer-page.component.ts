import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../../components/customerComponents/header/header.component';
import {FooterComponent} from '../../../components/customerComponents/footer/footer.component';
import {Router} from '@angular/router';
import {TokenService} from '../../../service/token_service/token.service';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent implements OnInit{

  constructor(private  router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    const token:string | null = localStorage.getItem('token')
    if(!token){
      this.router.navigate(['/login'])
    }else {
      const role:string | null = this.tokenService.getRoleFromToken(token);
      if(role != 'ROLE_CUSTOMER'){
        this.router.navigate(['/login'])
      }
    }
  }

}
