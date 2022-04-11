import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  test_listing_id = "62192512bc4114091cf62cc1";
  test_username = "okonri";

  constructor(private apollo: Apollo) { }

  getBookings(){
    let document = this.apollo
    .query<any>({
      query: gql`{
        getAllUserBooking(username: "okonri", secret: "secret"){
          listing_id
          booking_date
          booking_start
          booking_end
        }
      }`
    })

    return document;
  }

  addBooking(bookingdate:String, bookingstart:String, bookingend:String){
    const ADD_BOOKING = gql`
      mutation newBooking(
        $listing_title:   String!
        $booking_date:    String!
        $booking_start:   String!
        $booking_end:     String!
        $username:         String!)
        {
          addBooking(
            listing_id:       $listing_id,
            listing_title:       $listing_title,
            booking_date:   $booking_date,
            booking_start:  $booking_start,
            booking_end:    $booking_end,
            username:        $username)
            {
              booking_date
              booking_start
              booking_end
            }
        }`;

    let document = this.apollo
    .mutate<any>({
      mutation: ADD_BOOKING,variables: {
        listing_id: this.test_listing_id,
        booking_date: bookingdate,
        booking_start: bookingstart,
        booking_end:    bookingend,
        username: this.test_username
      }
    })
    return document;
  }
}