import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ListingsService } from '../services/listings.service'


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings:any;
  loading = true;
  error: any;

  constructor(private router: Router,private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.listingsService.getListings()
      .subscribe(
        ({ data, loading }) => {
          this.listings = data.getListings;
          this.loading = loading;
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }

  logOut(){
    localStorage.removeItem('isValidUser');
    this.router.navigate(['login']);
  }

}
