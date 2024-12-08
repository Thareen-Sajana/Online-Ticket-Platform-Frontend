import {Component, OnInit, signal} from '@angular/core';
import {ApiService} from '../../../service/api_service/api.service';
import {TokenService} from '../../../service/token_service/token.service';
import {Loading} from 'notiflix/build/notiflix-loading-aio';
import {lastValueFrom} from 'rxjs';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-ticket-history-page',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './ticket-history-page.component.html',
  styleUrl: './ticket-history-page.component.css'
})
export class TicketHistoryPageComponent implements OnInit {

  email = signal('');
  data: any = signal([])
  isReceiveData = signal(false);

  constructor(private apiService: ApiService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    const token: string = <string>localStorage.getItem('token');
    if (token){
      const email = <string>this.tokenService.getEmailFromToken(token);
      this.email.set(email);
    }
    this.getPurchaseDetails();
  }

  async getPurchaseDetails(){
    Loading.dots("Please wait", {
      svgColor: '#6610f2'
    })

    const data = {email: this.email()};

    try {
      const response:any = await lastValueFrom(this.apiService.ticketPurchaseHistory(data));

      this.data.set(response.data);
      console.log("this is length : "+this.data().length)
      this.isReceiveData.set(true);

      Loading.remove()
    }catch (e){
      Notify.failure("Can not load history");
      Loading.remove()
      this.isReceiveData.set(false);
    }
  }

  getLength(){
    return this.data().length;
  }

  getImageSource(data:any): string {
    return `data:${data.imageType};base64,${data.image}`;
  }

  getEventName(data:any): string {
    return data.eventName;
  }

  getQty(data:any): string {
    return data.qty;
  }

  getDate(data:any): string {
    return data.date;
  }

  getCategory(data:any): string {
    return data.category;
  }

  getPrice(data:any): number {
    return Number(data.price) * Number(data.qty);
  }


}
