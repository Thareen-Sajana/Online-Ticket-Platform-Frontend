import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
// import {Router} from '@angular/router';
import {ApiService} from '../../../service/api_service/api.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {Loading} from 'notiflix/build/notiflix-loading-aio';
import {firstValueFrom, Subscription} from 'rxjs';
import {TokenService} from '../../../service/token_service/token.service';
import {WebSocketService} from '../../../service/webSocket_service/webSocket.service';
// import {WebSocketService} from '../../../service/webSocket_service/webSocket.service';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  //totalTickets: number = 0;
  // socketClient:any = null;
  // private notificationSubscription:any;

  constructor(private router: Router, private apiService: ApiService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    // Update total tickets in real-time
    // setInterval(() => {
    //   this.totalTickets = this.webSocketService.ticketUpdates;
    // }, 100);
    // let ws = new SockJS('http://localhost:8080/ws');
    // this.socketClient = Stomp.over(ws);
    // const connectHeaders = {};
    // const sessinId = "sessionIsd444"
    // this.socketClient.connect(connectHeaders, () => {
    //   console.log('Connected! to WS...');
    //   this.notificationSubscription = this.socketClient.subscribe(
    //     `/user/${sessinId}/notification`,
    //     (message:any) => {
    //       console.log("this is message form bakend : " + message)
    //     }
    //   )
    // });
  }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  })

  async login() {
    //this.router.navigate(['/customer'])
    console.log("this sis login form : "+ JSON.stringify(this.loginForm.value))
    if (this.loginForm.valid) {

      Loading.dots("Please wait", {
        svgColor: '#6610f2'
      })
      try {

        const response: any = await firstValueFrom(this.apiService.login(this.loginForm.value))
        console.log("thid is response :" + JSON.stringify(response))

        if (response.message === "user not exist") {
          Notify.failure("User does not exist");
        }else {

          localStorage.setItem('token', response.token);

          const role: string = <string>this.tokenService.getRoleFromToken(response.token);
          if(role === 'ROLE_CUSTOMER'){
            this.router.navigate(['/customer']);
          }
          if(role === 'ROLE_VENDOR'){
            this.router.navigate(['/vendor']);
          }

          Notify.success("Successfully logged in!");
        }

      } catch (error) {
        Notify.failure("Something went wrong");
      }

      Loading.remove()

    }else {
      Notify.failure("Invalid email or password");
    }

  }


}

