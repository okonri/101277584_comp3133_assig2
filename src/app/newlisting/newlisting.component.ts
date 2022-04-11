import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../services/listings.service'


@Component({
  selector: 'app-newlisting',
  templateUrl: './newlisting.component.html',
  styleUrls: ['./newlisting.component.css']
})
export class NewlistingComponent implements OnInit {

  listing:any;

  constructor(private router: Router,private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.listingsService.getListings().subscribe(({data}) =>{
      this.listing = data.addListing;
    })
  }

  onSubmit(listingForm: NgForm):void{
    let listing_title = listingForm.value.listing_title
    let description = listingForm.value.description
    let street = listingForm.value.street
    let city = listingForm.value.city
    let postal_code = listingForm.value.postal_code
    let price = listingForm.value.price
    let email = listingForm.value.email

    this.listingsService.addListing(listing_title, description, street,city, postal_code, price ,email).subscribe(
      ({ data }) => {
        alert("Listing Saved!")
      },
      error => {
        console.log("there was an error sending the listing data", error);
      }
    );

    this.router.navigateByUrl('/listings')
   }

}