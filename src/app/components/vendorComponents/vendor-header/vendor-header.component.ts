import {Component, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Router} from '@angular/router';
import {TokenService} from '../../../service/token_service/token.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-vendor-header',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './vendor-header.component.html',
  styleUrl: './vendor-header.component.css'
})
export class VendorHeaderComponent implements OnInit {

  //firstName: string | null = null;
  firstName = signal<string | null>(null);

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    const token:string | null = localStorage.getItem('token')
    if(token){
      this.firstName.set(this.tokenService.getFirstNameFromToken(token));
    }
  }

  logOutBtn() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
    Notify.success("Successfully logged out");
  }

}
