import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {TokenService} from '../../../service/token_service/token.service';
import {ApiService} from '../../../service/api_service/api.service';
import {firstValueFrom, lastValueFrom, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Loading} from 'notiflix/build/notiflix-loading-aio';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css'
})
export class CreateSessionComponent {

  constructor(private tokenService: TokenService, private apiService: ApiService, private http: HttpClient) {
  }

  //selectedFileName: string | null = null;
  selectedFileName = signal<string | null>(null);
  isImage = signal<boolean>(true);
  selectedFile = signal<File | null>(null);

  vendorForm = new FormGroup({
    eventName: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    ticketPrice: new FormControl("", [Validators.required, Validators.min(0), ]),
    totalTicket: new FormControl("", [Validators.required, Validators.min(0), ]),
    ticketPoolCapacity: new FormControl("", [Validators.required, Validators.min(0), ]),
    ticketReleaseRate: new FormControl("", [Validators.required, Validators.min(0), Validators.max(5)]),
    customerReleaseRate: new FormControl("", [Validators.required, Validators.min(0), Validators.max(5)]),
    vipDiscount: new FormControl("", [Validators.required, Validators.min(0), Validators.max(100)]),
    category: new FormControl("", [Validators.required]),
    ticketType: new FormControl("", [Validators.required]),
    eventDate: new FormControl("", [Validators.required]),
    ticketImage: new FormControl("", [Validators.required]),
    eventDescription: new FormControl("", [Validators.required, Validators.minLength(150), Validators.maxLength(250)]),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFileName.set(input.files[0].name);
    }
    console.log("this is image type : "+ (input.files && input.files[0].type))
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    this.isImage.set(false)

    if (input.files && (input.files[0].type && allowedTypes.includes(input.files[0].type))) {
      this.isImage.set(true)
      this.selectedFile.set(input.files[0])
      console.log("this is is image inside: "+ this.isImage())
    }
    console.log("this is is image : "+ this.isImage())
  }

  async createSession(){
    console.log("this is vendor form : "+ JSON.stringify(this.vendorForm.value))
    console.log("this is ticket price : "+ this.vendorForm.controls['totalTicket'].value)
    console.log("this is ticket pool capacity : "+ this.vendorForm.controls['ticketPoolCapacity'].value)

    const totalTicket = this.vendorForm.get('totalTicket')?.value;
    const ticketPoolCapacity = this.vendorForm.get('ticketPoolCapacity')?.value;

    const token: string = <string>localStorage.getItem('token');
    console.log("this is email : "+ this.tokenService.getEmailFromToken(token))

    const formData = new FormData();
    formData.append('ticketImage', <File>this.selectedFile())

    if (this.vendorForm.valid && this.isImage()){
      if (totalTicket != null && ticketPoolCapacity != null && totalTicket >= ticketPoolCapacity) {
        console.log("this is obj : "+ JSON.stringify(this.vendorForm.value))

        Loading.dots("Please wait", {
          svgColor: '#6610f2'
        })

        const email: string = <string>this.tokenService.getEmailFromToken(token);
        const data = {...this.vendorForm.value, email: email}
        delete data.ticketImage;
        formData.append('userData', JSON.stringify(data))

        console.log("this is data : "+ JSON.stringify(data))
        try {

          const response = await firstValueFrom(this.apiService.session(formData));
          console.log("this is reponse : "+ JSON.stringify(response));

          if(response.message === "Done"){
            Loading.remove()
            Swal.fire({
              title: "Successful!",
              text: "Successfully start a session!",
              icon: "success"
            });
          }

          Loading.remove()

        } catch (error) {
          Notify.failure("Cannot create session")
          Loading.remove();
        }
        console.log("this is done");

      }else {
        Notify.failure("Ticket pool should be less than or equal total ticket")
      }
    }else {
      Notify.failure("Please enter correct details")
    }



    // const response: any = await lastValueFrom(this.apiService.session(formData));
    // console.log("this is reponse : "+ JSON.stringify(response));



  }


}
