import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsRoutingModule } from './icons-routing.module';
import { IconsmindComponent } from './iconsmind/iconsmind.component';
import { InwardComponent } from './inward/inward.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IconsRoutingModule,
    FormsModule
  ],
  declarations: [IconsmindComponent,InwardComponent]
})
export class IconsModule { }
