import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../service/api_service/api.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {lastValueFrom, single} from 'rxjs';
import {Loading} from 'notiflix/build/notiflix-loading-aio';
import {FormsModule} from '@angular/forms';
import {TokenService} from '../../../service/token_service/token.service';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-buy-ticket-ditails-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './buy-ticket-ditails-page.component.html',
  styleUrl: './buy-ticket-ditails-page.component.css'
})
export class BuyTicketDitailsPageComponent implements OnInit {

  id = signal<string >('')
  email = signal<string>('');
  qty = signal<string>('1');
  totalTickets = signal<string>('')
  data:any = signal({})
  realTimeData:any = signal({})

  socketClient:any = null;
  private notificationSubscription:any;

  constructor(private routes: Router, private router: ActivatedRoute, private service: ApiService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id:string = <string>params.get('id');
      this.id.set(id);
      console.log("this is id :"+ this.id());
    })

    let ws = new SockJS('http://localhost:8080/ws');
    this.socketClient = Stomp.over(ws);
    const connectHeaders = {};

    this.socketClient.connect(connectHeaders, () => {
      console.log('Connected! to WS...');
      this.notificationSubscription = this.socketClient.subscribe(
        `/user/${this.id()}/notification`,
        (message:any) => {
          console.log("this is message form backend : " + JSON.stringify(message))
          console.log("this is message form backend : " + JSON.stringify(message.body))
          if (message.body) {
            this.realTimeData.set(JSON.parse(message.body));
            console.log("this is message form backend {Session ID} : " +  this.realTimeData().sessionId)
            console.log("this is message form backend {Qty} : " + this.realTimeData().qty)
            if (this.id() == this.realTimeData().sessionId){
              console.log("this iss equal .............")
              this.totalTickets.set(<string>this.realTimeData().qty)
            }
          }

        }
      )
    });

    const token: string = <string>localStorage.getItem('token');
    if (token){
      const email = <string>this.tokenService.getEmailFromToken(token);
      this.email.set(email);
    }

    console.log("This is buyer emaol : "+ this.email())

    this.getTicketDetails(this.id())
  }

  async getTicketDetails(id:string){
    Loading.dots("Please wait", {
      svgColor: '#6610f2'
    })
    try {

      const response:any = await lastValueFrom(this.service.ticketDetailsById(id));
      console.log("this is response : "+ + JSON.stringify(response.data));
      await this.data.set(response.data);
      console.log("this is response signal : "+ + JSON.stringify(this.data()));
      this.totalTickets.set(this.data().totalTicket)
      Loading.remove()
    }catch (e){
      Notify.failure("Cant Load...")
      Loading.remove()
      this.routes.navigate(['/customer/buy-now'])
    }
  }

  getImageSource(): string {
    return `data:${this.data().imageType};base64,${this.data().ticketImage}`;
  }

  async buyNowBtn(){

    const ticketQtyInput = document.getElementById('ticketQty') as HTMLInputElement;

    if (!ticketQtyInput) {
      console.error("The input element with id 'ticketQty' was not found.");
      return;
    }

    // Get the user entered value
    const enteredValue = ticketQtyInput.value;
    this.qty.set(enteredValue)
    console.log('User entered value:', enteredValue);

    console.log("this is buy button id : " + this.id());
    Loading.dots("Please wait", {
      svgColor: '#6610f2'
    })

    const data = {id: this.id(), qty: this.qty(), email: this.email()};
    try {
      const response:any = await lastValueFrom(this.service.buyTickets(data));
      console.log("this is reponse form the buy button : " + JSON.stringify(response))
      Loading.remove()
    } catch (e){
      Notify.failure("Can not buy now")
      Loading.remove()
    }

    // Send the sessionId to the backend
    this.socketClient.send(
      "/app/get-qty", // Backend endpoint
      {}, // Headers
      this.id() // Payload
    );
  }

}
