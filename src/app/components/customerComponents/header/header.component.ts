import { CommonModule } from '@angular/common';
import {Component, OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { Router} from '@angular/router';
import {TokenService} from '../../../service/token_service/token.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {ApiService} from '../../../service/api_service/api.service';
import {lastValueFrom} from 'rxjs';
import {Loading} from 'notiflix/build/notiflix-loading-aio';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, DropdownModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  //firstName: string | null = null;
  firstName = signal<string | null>(null);
  isLoading = signal<boolean>(true);
  customerType = signal<string>("Regular Customer")
  constructor(private tokenService: TokenService, private router: Router, private apiService: ApiService) {
  }

  ngOnInit(): void {
    const token:string | null = localStorage.getItem('token')
    if(token){
      this.firstName.set(this.tokenService.getFirstNameFromToken(token))
      console.log("this is role : "+ this.tokenService.getRoleFromToken(token))
      this.getCustomerType(token)
    }
  }

  private async getCustomerType(token :string) {
    const email: string = <string>this.tokenService.getEmailFromToken(token);
    console.log("this is email : " + email)
    const data = {email: email}
    try {
      const response:any = await lastValueFrom(this.apiService.getCustomerType(data));

      this.customerType.set(response.data);
      this.isLoading.set(false)
      localStorage.setItem('customer-type', JSON.stringify(response.data))

    }catch (e){
      this.isLoading.set(true)
    }
  }

  logOutBtn() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
    Notify.success("Successfully logged out");
  }

}


