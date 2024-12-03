import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {VendorHeaderComponent} from '../../../components/vendorComponents/vendor-header/vendor-header.component';
import {FooterComponent} from '../../../components/customerComponents/footer/footer.component';
import {Router} from '@angular/router';
import {TokenService} from '../../../service/token_service/token.service';

@Component({
  selector: 'app-vendor-page',
  standalone: true,
  imports: [RouterOutlet, VendorHeaderComponent, FooterComponent],
  templateUrl: './vendor-page.component.html',
  styleUrl: './vendor-page.component.css'
})
export class VendorPageComponent implements OnInit{

  constructor(private router: Router, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    const token:string | null = localStorage.getItem('token')
    if(!token){
      this.router.navigate(['/login'])
    }else {
      console.log("token available")
      const role:string | null = this.tokenService.getRoleFromToken(token);
      if (role != 'ROLE_VENDOR'){
        this.router.navigate(['/login'])
      }
    }
  }
}
