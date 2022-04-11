import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:any;

  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(({data}) =>{
      this.user = data.getUser;
    })
  }

  onSubmit(registerForm: NgForm):void{
    let firstName = registerForm.value.firstname
    let lastName = registerForm.value.lastname
    let userName = registerForm.value.username
    let password = registerForm.value.password
    let email = registerForm.value.email

    this.userService.addUser(firstName, lastName, userName,password,email).subscribe(
      ({ data }) => {
        alert("User Saved!")
      },
      error => {
        console.log("there was an error sending the query", error);
      }
    );

    this.router.navigateByUrl('/login')
   }

}