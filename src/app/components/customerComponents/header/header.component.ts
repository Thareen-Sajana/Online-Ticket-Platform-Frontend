import { CommonModule } from '@angular/common';
import {Component, OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { Router} from '@angular/router';
import {TokenService} from '../../../service/token_service/token.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';

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
  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    const token:string | null = localStorage.getItem('token')
    if(token){
      this.firstName.set(this.tokenService.getFirstNameFromToken(token))
      console.log("this is role : "+ this.tokenService.getRoleFromToken(token))
    }
  }

  logOutBtn() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
    Notify.success("Successfully logged out");
  }

}


