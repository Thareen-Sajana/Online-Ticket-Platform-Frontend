import {Component, OnInit, signal} from '@angular/core';
import {TokenService} from '../../../service/token_service/token.service';
import {lastValueFrom, single} from 'rxjs';
import {Loading} from 'notiflix/build/notiflix-loading-aio';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {ApiService} from '../../../service/api_service/api.service';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-manage-session',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './manage-session.component.html',
  styleUrl: './manage-session.component.css'
})
export class ManageSessionComponent implements OnInit {

  email = signal<string>("")
  data: any = signal([])
  isReceiveData = signal(false);

  constructor(private tokenService: TokenService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    const token: string = <string>localStorage.getItem('token');
    const email:string = <string>this.tokenService.getEmailFromToken(token);
    this.email.set(email);
    this.getManageSessionData()
    console.log("email : "+ this.email())
    //console.log("this is response signal 22 : "+ + JSON.stringify(this.data()));
  }

  async getManageSessionData(){
    Loading.dots("Please wait", {
      svgColor: '#6610f2'
    })
    try {

      const response:any = await lastValueFrom(this.apiService.manageSessionDataByEmail(this.email()));
      //const response:any = await lastValueFrom(this.apiService.hello());
      //console.log("this is response : "+ + JSON.stringify(response.data));
      this.data.set(response.data);
      this.isReceiveData.set(true)
      //console.log("this is response signal : "+ + JSON.stringify(this.data()));
      Loading.remove()
    }catch (e){
      Notify.failure("Cant Load...")
      Loading.remove()
    }
  }

  isStarted(session:any){

    // const currentData = this.data();
    //
    // const updatedData = currentData.map((item: any) => {
    //   if (item.sessionId === session.sessionId) {
    //
    //     return { ...item, isStarted: !item.isStarted };
    //   }
    //   return item;
    // });
    //
    // this.data.set(updatedData);

    return session.isStarted;
  }

  // showBtn() {
  //   const currentData = this.data();
  //
  //   const updatedData = currentData.map((item: any) => {
  //     if (item.sessionId === session.sessionId) {
  //
  //       return { ...item, isStarted: !item.isStarted };
  //     }
  //     return item;
  //   });
  //
  //   this.data.set(updatedData);
  // }

  getLength():string {
    return this.data().length;
  }

  getImageSource(image: any): string {
    return `data:${image.imageType};base64,${image.ticketImage}`;
  }

  getName(session:any): string {
    return session.eventName;
  }

  getCategory(session:any): string {
    return session.category;
  }

  getDate(session:any): string {
    return session.eventDate;
  }

  startBtn(session:any){
    console.log("this is button : start"+ session.sessionId);
    this.startSession(session.sessionId)

    const currentData = this.data();

    const updatedData = currentData.map((item: any) => {
      if (item.sessionId === session.sessionId) {

        return { ...item, isStarted: !item.isStarted };
      }
      return item;
    });

    this.data.set(updatedData);
  }

  stopBtn(session:any){
    console.log("this is stop btn : ")
    this.stopSession(session.sessionId)

    const currentData = this.data();

    const updatedData = currentData.map((item: any) => {
      if (item.sessionId === session.sessionId) {

        return { ...item, isStarted: !item.isStarted };
      }
      return item;
    });

    this.data.set(updatedData);
  }

  removeBtn(session:any){
    console.log("Removing session with ID:", session.sessionId);
    this.data.set(this.data().filter((item: any) => item.sessionId !== session.sessionId));
    this.removeSession(session.sessionId);
  }

  async removeSession(sessionId:string){
    Loading.dots("Please wait", {
      svgColor: '#6610f2'
    })
    try {

      const response:any = await lastValueFrom(this.apiService.removeSession(sessionId));
      //this.data.set(response);
      Loading.remove()
    }catch (e){
      Notify.failure("Cant Delete Session...")
      Loading.remove()
    }
  }

  async stopSession(sessionId:string){
    Loading.dots("Please wait", {
      svgColor: '#6610f2'
    })
    try {

      const response:any = await lastValueFrom(this.apiService.stopSession(sessionId));
      //this.data.set(response);
      Loading.remove()
    }catch (e){
      Notify.failure("Cant stop Session...")
      Loading.remove()
    }
  }

  async startSession(sessionId:string){
    Loading.dots("Please wait", {
      svgColor: '#6610f2'
    })
    try {

      const response:any = await lastValueFrom(this.apiService.startSession(sessionId));
      //this.data.set(response);
      Loading.remove()
    }catch (e){
      Notify.failure("Cant Start Session...")
      Loading.remove()
    }
  }

}
