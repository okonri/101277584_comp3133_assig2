import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service'
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.css']
})
export class NewbookingComponent implements OnInit {

  constructor(private router: Router,private bookingService: BookingService) { }

  ngOnInit(): void {
  }

  onSubmit(bookingForm: NgForm):void{
      let start = bookingForm.value.start.toString();
      let end = bookingForm.value.end.toString();
      let newDay = new Date().toString();

      console.log(start)
      console.log(end)
      console.log(newDay)


      this.bookingService.addBooking(newDay,start,end).subscribe(
        ({ data }) => {
          alert("Booking Saved!")
        },
        error => {
          console.log("there was an error sending the query", error);
        }
      );

  }

}