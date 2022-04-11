import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private apollo: Apollo) { }

  getListings(){
    let document = this.apollo
    .query<any>({
      query: gql`{
        getListings( secret: "secret"){
            listing_title
            description
            street
            city
            postal_code
            price
            email
        }
      }`
    })
    return document;
  }

  addListing(listing_title: string, description: string, street:string, city:string, postal_code:string, price:string, email:string){
    const ADD_LISTING = gql`
      mutation newUser(
        $listing_title:  String!
        $description:  String!
        $street:  String!
        $city:  String!
        $postal_code:     String!
        $price:  String!
        $email:  String!)
        {
          addListing(
            listing_title: $listing_title,
            description: $description,
            street: $street,
            city: $city,
            postal_code: $postal_code,
            price: $price,
            email: $email)
            {
              listing_title
              description
              street
              city
              postal_code
              price
              email
            }
        }`;

    let document = this.apollo
    .mutate<any>({
      mutation: ADD_LISTING,variables: {
        listing_title: listing_title,
        description: description,
        street: street,
        city: city,
        postal_code: postal_code,
        price: price,
        email: email
      }
    })

    return document;
  }

  getListingByName(name:String){
    let document = this.apollo
    .query<any>({
      query: gql`
        query($listing_title: String!){
          searchListingByName(listing_title: $listing_title){
            listing_title
            description
            street
            city
            postal_code
            price
            email
        }
      }`,
      variables: {
        listing_title: name
      }
    })
    return document;
  }

  getListingByCity(city:String){
    let document = this.apollo
    .query<any>({
      query: gql`
        query($city: String!){
          searchListingByCity(city: $city){
            listing_title
            description
            street
            city
            postal_code
            price
            email
        }
      }`,
      variables: {
        city: city
        }
      })
      return document;
  }

  getListingByPostal(postal_code:String){
    let document = this.apollo
    .query<any>({
      query: gql`
        query($postal_code: String!){
          searchListingByPostalCode(postal_code: $postal_code){
            listing_title
            description
            street
            city
            postal_code
            price
            email
        }
      }`,
      variables: {
        postal_code: postal_code
        }
      })
      return document;
  }
}