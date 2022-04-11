import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListingsService } from '../services/listings.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listingsName:any;
  listingsCity:any;
  listingsPostal:any;
  loading = true;
  error: any;

  constructor(private listingsService: ListingsService) { }

  ngOnInit(): void {
  }

  onSubmitName(searchForm: NgForm):void{
   let listingsName = searchForm.value.searchByName

   this.listingsService.getListingByName(listingsName)
    .subscribe(
      ({ data, loading }) => {
        if (data.searchListingByName) this.listingsName = data.searchListingByName;
        else alert("error");
        this.loading = loading;
      }
    );
  }

  onSubmitCity(citySearchForm: NgForm):void{
    let listingsCity = citySearchForm.value.searchByCity

    this.listingsService.getListingByCity(listingsCity)
     .subscribe(
       ({ data }) => {
         if (data.searchListingByCity) this.listingsCity = data.searchListingByCity;
         else alert("error");
       }
     );
   }

   onSubmitPostal(postalSearchForm: NgForm):void{
    let listingsPostal = postalSearchForm.value.searchByPostal

    this.listingsService.getListingByPostal(listingsPostal)
     .subscribe(
       ({ data }) => {
         if (data.searchListingByPostalCode) this.listingsPostal = data.searchListingByPostalCode;
         else alert("error");
       }
     );
   }

}