import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private apollo: Apollo) { }

  getUsers(){
    let document = this.apollo
    .query<any>({
      query: gql`{
        getUser{
            username
            password
            email
        }
      }`
    })

    return document;
  }

  addUser(firstName: string, lastName: string, userName:string, passWord:string, theEmail:string){
    const ADD_USER = gql`
      mutation newUser(
        $firstname:  String!
        $lastname:  String!
        $username:  String!
        $password:  String!
        $email:     String!)
        {
          addUser(
            firstname: $firstname,
            lastname: $lastname,
            username: $username,
            password: $password,
            email: $email)
            {
              username
              password
              email
            }
        }`;

    let document = this.apollo
    .mutate<any>({
      mutation: ADD_USER,variables: {
        firstname: firstName,
        lastname: lastName,
        username: userName,
        password: passWord,
        email:    theEmail
      }
    })

    return document;
  }
}