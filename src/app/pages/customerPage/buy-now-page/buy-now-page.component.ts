import {Component, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ApiService} from '../../../service/api_service/api.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {lastValueFrom} from 'rxjs';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-buy-now-page',
  standalone: true,
  imports: [
    RouterLink, NgIf, NgFor
  ],
  templateUrl: './buy-now-page.component.html',
  styleUrl: './buy-now-page.component.css'
})
export class BuyNowPageComponent implements OnInit {

  ticketData = signal([]);
  isReceiveData = signal(false);

  constructor(private service: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getTicketData();

    const customerType = <string>localStorage.getItem('customer-type')
    if(customerType && customerType=='Regular Customer'){
      // @ts-ignore
      const filteredList = this.ticketData().filter(ticket => ticket.ticketType === "regular")
      this.ticketData.set(filteredList)
    }
  }

  async getTicketData(){

    try {

      const response:any = await lastValueFrom(this.service.ticketDetails());
      this.ticketData.set(response.data);
      console.log("this is data broo : "+ this.ticketData())
      this.isReceiveData.set(true)
      //console.log("this is data broo : "+ JSON.stringify(this.ticketData()))

    } catch (e) {
      Notify.failure("Something went wrong!");
    }
  }

  getImageSource(image: any): string {
    return `data:${image.imageType};base64,${image.ticketImage}`;
  }

  getEventData(ticket: any): string {
    return ticket.eventDate;
  }

  getTicketName(ticket: any): string {
    return ticket.eventName;
  }

  loadTicketDetailsPage(ticket: any) {
    //console.log("this is type of id : "+  typeof(ticket.sessionId))
    console.log("this is id : "+ ticket.sessionId)
    this.router.navigate([`/customer/ticket-details/${ticket.sessionId}`])
  }

}
