import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {routes} from '../../../app.routes';
import {ApiService} from '../../../service/api_service/api.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {lastValueFrom, single} from 'rxjs';
import {Loading} from 'notiflix/build/notiflix-loading-aio';
import {FormsModule} from '@angular/forms';

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
  qty = signal<string>('1');
  data:any = signal({})


  constructor(private routes: Router, private router: ActivatedRoute, private service: ApiService) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id:string = <string>params.get('id');
      this.id.set(id);
      console.log("this is id :"+ this.id());
    })

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

    const data = {id: this.id(), qty: this.qty()};
    try {
      const response:any = await lastValueFrom(this.service.buyTickets(data));
      console.log("this is reponse form the buy button : " + JSON.stringify(response))
      Loading.remove()
    } catch (e){
      Notify.failure("Can not buy now")
      Loading.remove()
    }
  }

}
