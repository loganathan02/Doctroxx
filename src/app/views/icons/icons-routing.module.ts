import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconsmindComponent } from './iconsmind/iconsmind.component';
import { InwardComponent } from './inward/inward.component';

const routes: Routes = [
    {
        path: 'iconsmind',
        component: IconsmindComponent
    },
    {
      path: 'inward',
      component: InwardComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
