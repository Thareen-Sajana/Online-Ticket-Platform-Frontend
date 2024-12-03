import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {ApiService} from '../../../service/api_service/api.service';
import {lastValueFrom} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgIf
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(private service: ApiService, private router: Router) {}

  registerForm = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
    lastname: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    address: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
    contactNumber: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl("", [Validators.required])
  })

  async registerBtn() {
    // console.log(this.registerForm.controls['firstName'].status)
    // console.log(this.registerForm.controls['lastName'].status)
    // console.log(this.registerForm.value)
    console.log("form valid : " + this.registerForm.valid)
    console.log(this.registerForm.value)

    if ((this.registerForm.controls['confirmPassword'].value === this.registerForm.controls['password'].value) && this.registerForm.valid) {

      console.log("this is register forn ::::::: " + JSON.stringify(this.registerForm.value))
      Loading.dots("Please wait", {
        svgColor: '#6610f2'
      })

      try {
        const response:any = await lastValueFrom(this.service.register(this.registerForm.value));
        console.log("this is response :" + JSON.stringify(response))


        if (response.message === "User already exist") {
          Notify.failure('User email is already taken');
        }else {
          Notify.success("Successfully registered!");
          localStorage.setItem("token", response.token)
          //console.log("this is role : " +this.registerForm.value.role);

          const role:string = <string>this.registerForm.value.role;
          if(role === 'Customer'){
            this.router.navigate(['/customer']);
          }
          if(role === 'Vendor'){
            this.router.navigate(['/vendor']);
          }
        }

      } catch (error) {
        Notify.failure('Registration failed.');
      }

      Loading.remove()
    } else {
      Notify.failure("Cannot register user");
    }

  }
}

