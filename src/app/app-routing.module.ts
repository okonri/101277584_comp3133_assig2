import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ListingsComponent } from './listings/listings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SearchComponent } from './search/search.component';
import { NewbookingComponent } from './newbooking/newbooking.component';
import { NewlistingComponent } from './newlisting/newlisting.component';


const routes: Routes = [
  { path: 'listings', component: ListingsComponent},
  { path: 'newlisting', component: NewlistingComponent},
  { path: 'booking', component:BookingsComponent, canActivate: [AuthGuard]},
  { path: 'newbooking', component:NewbookingComponent, canActivate: [AuthGuard]},
  { path: 'search', component:SearchComponent, canActivate: [AuthGuard]},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: '', redirectTo:'listings', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }