import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier/supplier.component';

const routes: Routes = [
    // {
    //     path: '',
    //     component: InvoiceListComponent
    // },
    // {
    //     path: 'new',
    //     component: InvoiceDetailComponent
    // },
    // {
    //     path: 'edit/:id',
    //     component: InvoiceDetailComponent
    // }
    {
        path:'supplier',
        component: SupplierComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
