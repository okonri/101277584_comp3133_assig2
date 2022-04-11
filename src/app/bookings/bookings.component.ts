import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service'

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings:any;
  loading = true;
  error: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getBookings()
    .subscribe(
      ({ data, loading }) => {
        this.bookings = data.getAllUserBooking;
        this.loading = loading;
        console.log(this.bookings);
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

}