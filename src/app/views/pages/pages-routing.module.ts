import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/product-inventory.component';

const routes: Routes = [
    {
        // path: 'profile',
        path:'product-inventory',
        component: UserProfileComponent
        
    },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
