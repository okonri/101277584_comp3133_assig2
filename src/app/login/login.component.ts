import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let val = localStorage.getItem('isValidUser')

    if(val != null && val == 'true'){
        this.router.navigate(['/listings']);
    }
  }

  onSubmit(loginForm: NgForm):void{
   let userName = loginForm.value.username
   let password = loginForm.value.password

   //Call API/services to validate the user from backend
   if(userName == 'me' && password == 'me'){
     localStorage.setItem('isValidUser', "true");
     //sessionStorage.setItem('isValidUser', "true");
     //Redirect to listings page
      this.router.navigate(['/listings'])
   }else{
    localStorage.setItem('isValidUser', "false");
    alert('Username or password invalid')
   }
  }
}